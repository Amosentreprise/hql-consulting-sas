/* Accès aux contenus : lecture publique (avec repli sur le contenu actuel), écriture admin, messages. */
import { useEffect, useState } from "react";
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp,
  setDoc, updateDoc, where,
} from "firebase/firestore";
import { db } from "./firebase";
import { defaults } from "./defaults";
import type { CollectionName, Collections, ContactMessage, MessageStatus } from "./types";

const byOrder = <T extends { order?: number }>(a: T, b: T) => (a.order ?? 999) - (b.order ?? 999);

/* ---------- Lecture publique ---------- */

const cache = new Map<string, Promise<unknown[]>>();
let seededPromise: Promise<Record<string, boolean>> | null = null;

function loadSeeded() {
  if (!db) return Promise.resolve({} as Record<string, boolean>);
  seededPromise ??= getDoc(doc(db, "settings", "site"))
    .then((snap) => (snap.exists() ? (snap.data().seeded ?? {}) : {}))
    .catch(() => ({}));
  return seededPromise;
}

export function invalidateContent(name?: CollectionName) {
  if (name) cache.delete(name);
  else cache.clear();
  seededPromise = null;
}

async function loadPublished<K extends CollectionName>(name: K): Promise<Collections[K][]> {
  const fallback = () => (defaults[name] as unknown as Collections[K][]).filter((i) => i.published).sort(byOrder);
  if (!db) return fallback();
  try {
    const [snap, seeded] = await Promise.all([
      getDocs(query(collection(db, name), where("published", "==", true))),
      loadSeeded(),
    ]);
    if (snap.empty && !seeded[name]) return fallback();
    return snap.docs.map((d) => ({ ...d.data(), id: d.id }) as Collections[K]).sort(byOrder);
  } catch (error) {
    console.warn(`[HQL] Lecture Firestore impossible pour "${name}", contenu par défaut utilisé.`, error);
    return fallback();
  }
}

export function useCollection<K extends CollectionName>(name: K) {
  const [items, setItems] = useState<Collections[K][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    if (!cache.has(name)) cache.set(name, loadPublished(name));
    (cache.get(name) as Promise<Collections[K][]>).then((result) => {
      if (!alive) return;
      setItems(result);
      setLoading(false);
    });
    return () => { alive = false; };
  }, [name]);

  return { items, loading };
}

/** Trouve un élément par slug (ou id) dans une collection publique. */
export function useItem<K extends CollectionName>(name: K, slug: string | undefined) {
  const { items, loading } = useCollection(name);
  const item = items.find((i) => (i as { slug?: string }).slug === slug || i.id === slug);
  return { item, loading, items };
}

/* ---------- Écriture admin ---------- */

export function slugify(text: string) {
  return text
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function clean<T extends Record<string, unknown>>(data: T): T {
  return Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)) as T;
}

function requireDb() {
  if (!db) throw new Error("Firebase n'est pas configuré.");
  return db;
}

export function useAdminCollection<K extends CollectionName>(name: K) {
  const [items, setItems] = useState<Collections[K][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) { setLoading(false); return; }
    return onSnapshot(
      collection(db, name),
      (snap) => {
        setItems(snap.docs.map((d) => ({ ...d.data(), id: d.id }) as Collections[K]).sort(byOrder));
        setLoading(false);
      },
      (err) => { setError(err.message); setLoading(false); },
    );
  }, [name]);

  return { items, loading, error };
}

export async function saveItem(name: CollectionName, id: string | null, data: Record<string, unknown>) {
  const firestore = requireDb();
  const { id: _ignored, createdAt: _c, ...rest } = data as Record<string, unknown>;
  if (id) {
    await updateDoc(doc(firestore, name, id), clean({ ...rest, updatedAt: serverTimestamp() }));
  } else {
    await addDoc(collection(firestore, name), clean({ ...rest, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  }
  invalidateContent(name);
  await markSeeded(name);
}

export async function removeItem(name: CollectionName, id: string) {
  await deleteDoc(doc(requireDb(), name, id));
  invalidateContent(name);
}

export async function swapOrder(name: CollectionName, a: { id: string; order: number }, b: { id: string; order: number }) {
  const firestore = requireDb();
  await Promise.all([
    updateDoc(doc(firestore, name, a.id), { order: b.order }),
    updateDoc(doc(firestore, name, b.id), { order: a.order }),
  ]);
  invalidateContent(name);
}

async function markSeeded(name: CollectionName) {
  await setDoc(doc(requireDb(), "settings", "site"), { seeded: { [name]: true } }, { merge: true });
}

/** Copie le contenu actuel du site dans Firestore (sans écraser ce qui existe déjà). */
export async function seedCollection(name: CollectionName) {
  const firestore = requireDb();
  let created = 0;
  for (const item of defaults[name]) {
    const ref = doc(firestore, name, item.id);
    if ((await getDoc(ref)).exists()) continue;
    const { id: _id, ...data } = item as { id: string } & Record<string, unknown>;
    await setDoc(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    created++;
  }
  await markSeeded(name);
  invalidateContent(name);
  return created;
}

export async function getSeededFlags() {
  if (!db) return {} as Record<string, boolean>;
  const snap = await getDoc(doc(db, "settings", "site"));
  return (snap.exists() ? (snap.data().seeded ?? {}) : {}) as Record<string, boolean>;
}

/* ---------- Messages (formulaires de contact) ---------- */

export async function submitMessage(input: { name: string; email: string; subject?: string; message: string; source: string; startedAt?: number }) {
  // Anti-robot : formulaire rempli en moins de 3 s = faux succès silencieux ; 1 envoi par minute et par navigateur.
  if (input.startedAt && Date.now() - input.startedAt < 3000) return;
  try {
    const last = Number(localStorage.getItem("hql:lastMessage") || 0);
    if (Date.now() - last < 60_000) throw new Error("Merci de patienter une minute avant un nouvel envoi.");
  } catch (e) { if ((e as Error).message.startsWith("Merci")) throw e; }
  if (!db) throw new Error("Le formulaire n'est pas disponible pour le moment. Écrivez-nous à contact@hqlconsulting.net.");
  await addDoc(collection(db, "messages"), {
    name: input.name.trim().slice(0, 120),
    email: input.email.trim().slice(0, 160),
    subject: (input.subject || "Non précisé").slice(0, 120),
    message: input.message.trim().slice(0, 4000),
    source: input.source,
    status: "new",
    createdAt: serverTimestamp(),
  });
  try { localStorage.setItem("hql:lastMessage", String(Date.now())); } catch { /* ignore */ }
}

export function useMessages() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!db) { setLoading(false); return; }
    return onSnapshot(collection(db, "messages"), (snap) => {
      const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }) as ContactMessage);
      list.sort((a, b) => (b.createdAt?.toDate().getTime() ?? 0) - (a.createdAt?.toDate().getTime() ?? 0));
      setItems(list);
      setLoading(false);
    }, () => setLoading(false));
  }, []);
  return { items, loading };
}

export const setMessageStatus = (id: string, status: MessageStatus) =>
  updateDoc(doc(requireDb(), "messages", id), { status });
export const deleteMessage = (id: string) => deleteDoc(doc(requireDb(), "messages", id));

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
