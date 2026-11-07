import { useEffect, useState } from "react";
import { Link } from "wouter";
import { collection, getCountFromServer } from "firebase/firestore";
import { Loader2, CheckCircle2, AlertCircle, DownloadCloud } from "lucide-react";
import { toast } from "sonner";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { getSeededFlags, seedCollection, useMessages } from "@/lib/content";
import { collectionOrder, schemas } from "@/components/admin/schemas";
import type { CollectionName } from "@/lib/types";

export default function Dashboard() {
  const [counts, setCounts] = useState<Partial<Record<CollectionName, number>>>({});
  const [seeded, setSeeded] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const { items: messages } = useMessages();
  const unread = messages.filter((m) => m.status === "new").length;

  const refresh = async () => {
    if (!db) return;
    const entries = await Promise.all(collectionOrder.map(async (n) => [n, (await getCountFromServer(collection(db!, n))).data().count] as const));
    setCounts(Object.fromEntries(entries));
    setSeeded(await getSeededFlags());
  };
  useEffect(() => { refresh().catch(() => {}); }, []);

  const seed = async (n: CollectionName) => {
    setBusy(n);
    try { const c = await seedCollection(n); toast.success(`${c} élément(s) importé(s) dans « ${schemas[n].label} ».`); await refresh(); } catch (e) { toast.error((e as Error).message); }
    setBusy(null);
  };

  const Status = ({ ok, label }: { ok: boolean; label: string }) => (
    <span className={`flex items-center gap-2 text-sm ${ok ? "text-[#14663A]" : "text-red-700"}`}>{ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}{label}</span>
  );

  return (
    <div>
      <div className="eyebrow">Vue d'ensemble</div>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-.05em]">Tableau de bord</h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/messages" className="bg-[#1739D1] p-6 text-white transition hover:-translate-y-1">
          <div className="text-[10px] font-bold uppercase tracking-[.16em] text-[#FFD21A]">Messages</div>
          <div className="mt-6 font-display text-5xl font-bold tracking-[-.06em]">{unread}</div>
          <div className="mt-1 text-sm text-white/70">non lu{unread > 1 ? "s" : ""} · {messages.length} au total</div>
        </Link>
        {collectionOrder.map((n) => (
          <Link key={n} href={`/admin/${n}`} className="bg-white p-6 shadow-[0_10px_30px_rgba(23,57,209,.06)] transition hover:-translate-y-1">
            <div className="text-[10px] font-bold uppercase tracking-[.16em] text-[#6B118E]">{schemas[n].label}</div>
            <div className="mt-6 font-display text-5xl font-bold tracking-[-.06em]">{counts[n] ?? "–"}</div>
            <div className="mt-1 text-sm opacity-60">élément(s)</div>
          </Link>
        ))}
      </div>

      <section className="mt-12 bg-white p-6 shadow-[0_10px_30px_rgba(23,57,209,.06)]">
        <h2 className="font-display text-2xl font-bold tracking-[-.04em]">État de la configuration</h2>
        <div className="mt-4 grid gap-2">
          <Status ok={isFirebaseConfigured} label="base de données + connexion" />
          <Status ok={isCloudinaryConfigured} label="images" />
        </div>
      </section>

      <section className="mt-6 bg-white p-6 shadow-[0_10px_30px_rgba(23,57,209,.06)]">
        <h2 className="font-display text-2xl font-bold tracking-[-.04em]">Importer le contenu actuel du site</h2>
        <p className="mt-2 max-w-2xl text-sm opacity-70">Tant qu'une section n'a pas été importée ou alimentée, le site affiche son contenu d'origine. Importez-le une fois pour pouvoir le modifier ici.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {collectionOrder.filter((n) => n !== "partners").map((n) => (
            <button key={n} disabled={busy !== null} onClick={() => seed(n)} className="flex items-center gap-2 border border-[#1739D1]/25 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.12em] disabled:opacity-50">
              {busy === n ? <Loader2 size={14} className="animate-spin" /> : seeded[n] ? <CheckCircle2 size={14} className="text-[#14663A]" /> : <DownloadCloud size={14} />} {schemas[n].label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
