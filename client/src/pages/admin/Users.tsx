import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import type { StaffRole } from "@/lib/types";

type Staff = { id: string; email?: string; name?: string; role: StaffRole };

export default function Users() {
  const { user, role } = useAuth();
  const [list, setList] = useState<Staff[]>([]);
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [newRole, setNewRole] = useState<StaffRole>("editor");

  useEffect(() => {
    if (!db) return;
    return onSnapshot(collection(db, "admins"), (s) => setList(s.docs.map((d) => ({ ...(d.data() as Staff), id: d.id }))));
  }, []);

  if (role !== "admin") return <p className="text-sm">Réservé aux administrateurs.</p>;

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !uid.trim()) return;
    try { await setDoc(doc(db, "admins", uid.trim()), { email: email.trim(), role: newRole }); toast.success("Accès accordé."); setUid(""); setEmail(""); }
    catch (err) { toast.error((err as Error).message); }
  };

  return (
    <div>
      <div className="eyebrow">Accès</div>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-.05em]">Utilisateurs</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 opacity-70">1) Créez le compte 2) La personne se connecte sur /admin/login : son identifiant (UID) s'affiche. 3) Collez-le ici avec son rôle. <strong>Administrateur</strong> : tout, y compris les accès. <strong>Éditeur</strong> : contenus et messages.</p>

      <form onSubmit={add} className="mt-8 grid gap-4 bg-white p-6 sm:grid-cols-[1.4fr_1fr_.7fr_auto] sm:items-end">
        <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">UID<input required className="form-input" value={uid} onChange={(e) => setUid(e.target.value)} /></label>
        <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">Email (repère)<input className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">Rôle<select className="form-input" value={newRole} onChange={(e) => setNewRole(e.target.value as StaffRole)}><option value="editor">Éditeur</option><option value="admin">Administrateur</option></select></label>
        <button className="bg-[#FFD21A] px-5 py-[15px] text-xs font-bold uppercase tracking-[.12em]">Accorder</button>
      </form>

      <ul className="mt-6 grid gap-3">
        {list.map((s) => (
          <li key={s.id} className="flex items-center gap-4 bg-white p-4">
            <div className="min-w-0 flex-1"><div className="truncate font-bold">{s.email || "—"}</div><div className="truncate font-mono text-xs opacity-50">{s.id}</div></div>
            <span className="bg-[#E6EBFF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em]">{s.role === "admin" ? "Administrateur" : "Éditeur"}</span>
            {s.id !== user?.uid && <button aria-label="Retirer l'accès" onClick={async () => { if (confirm("Retirer l'accès ?")) await deleteDoc(doc(db!, "admins", s.id)); }} className="p-2 text-red-700"><Trash2 size={16} /></button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
