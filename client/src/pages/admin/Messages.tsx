import { useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMessage, setMessageStatus, useMessages } from "@/lib/content";
import type { MessageStatus } from "@/lib/types";

const labels: Record<MessageStatus, string> = { new: "Nouveau", read: "Lu", done: "Traité" };
const tones: Record<MessageStatus, string> = { new: "bg-[#FFD21A]", read: "bg-[#E6EBFF]", done: "bg-[#E6F6EC]" };

export default function Messages() {
  const { items, loading } = useMessages();
  const [filter, setFilter] = useState<MessageStatus | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const list = items.filter((m) => filter === "all" || m.status === filter);

  const toggle = async (id: string, status: MessageStatus) => {
    setOpen(open === id ? null : id);
    if (open !== id && status === "new") await setMessageStatus(id, "read").catch(() => {});
  };

  return (
    <div>
      <div className="eyebrow">Boîte de réception</div>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-.05em]">Messages</h1>
      <div className="mt-8 flex flex-wrap gap-2 border-b border-[#1739D1]/15 pb-4">
        {(["all", "new", "read", "done"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[.14em] ${filter === f ? "bg-[#FFD21A]" : "text-[#6B118E]"}`}>{f === "all" ? "Tous" : labels[f]}</button>
        ))}
      </div>
      {loading ? <p className="mt-8 text-sm opacity-60">Chargement…</p> : list.length === 0 ? <p className="mt-8 text-sm opacity-60">Aucun message.</p> : (
        <ul className="mt-6 grid gap-3">
          {list.map((m) => (
            <li key={m.id} className="bg-white shadow-[0_10px_30px_rgba(23,57,209,.05)]">
              <button onClick={() => toggle(m.id, m.status)} className="flex w-full flex-wrap items-center gap-4 p-4 text-left">
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${tones[m.status]}`}>{labels[m.status]}</span>
                <span className="min-w-0 flex-1"><span className="block truncate font-bold">{m.name}</span><span className="block truncate text-xs opacity-60">{m.subject} · {m.email}</span></span>
                <span className="text-xs opacity-50">{m.createdAt?.toDate().toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}</span>
              </button>
              {open === m.id && (
                <div className="border-t border-[#1739D1]/10 p-5">
                  <p className="whitespace-pre-wrap text-sm leading-7">{m.message}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[.12em]">
                    <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + m.subject)}`} className="flex items-center gap-2 bg-[#1739D1] px-4 py-2.5 text-white"><Mail size={14} /> Répondre</a>
                    {m.status !== "done" && <button onClick={() => setMessageStatus(m.id, "done")} className="border border-[#1739D1]/25 px-4 py-2.5">Marquer comme traité</button>}
                    {m.status === "done" && <button onClick={() => setMessageStatus(m.id, "read")} className="border border-[#1739D1]/25 px-4 py-2.5">Rouvrir</button>}
                    <button onClick={async () => { if (confirm("Supprimer ce message ?")) { await deleteMessage(m.id); toast.success("Message supprimé."); } }} className="ml-auto flex items-center gap-2 text-red-700"><Trash2 size={14} /> Supprimer</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
