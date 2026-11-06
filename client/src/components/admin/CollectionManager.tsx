import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, DownloadCloud, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { removeItem, saveItem, seedCollection, slugify, swapOrder, useAdminCollection } from "@/lib/content";
import { optimize } from "@/lib/cloudinary";
import type { CollectionName } from "@/lib/types";
import ImageField from "./ImageField";
import { schemas, type FieldDef } from "./schemas";

type Row = Record<string, any> & { id: string; order: number; published: boolean };

function TagsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const t = draft.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <span key={t} className="flex items-center gap-2 bg-[#E6EBFF] px-3 py-1.5 text-xs font-bold text-[#1739D1]">
            {t}<button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Retirer ${t}`}><X size={12} /></button>
          </span>
        ))}
      </div>
      <input className="form-input" value={draft} placeholder="Ajouter…" onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }} onBlur={add} />
    </div>
  );
}

function FieldInput({ field, value, onChange, folder }: { field: FieldDef; value: any; onChange: (v: any) => void; folder: string }) {
  switch (field.type) {
    case "textarea": return <textarea className="form-input min-h-24" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
    case "markdown": return <textarea className="form-input min-h-56 font-mono text-sm" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
    case "select": return <select className="form-input" value={value ?? field.options?.[0].value} onChange={(e) => onChange(e.target.value)}>{field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
    case "tags": return <TagsInput value={value ?? []} onChange={onChange} />;
    case "lines": return <textarea className="form-input min-h-32" value={(value ?? []).join("\n")} onChange={(e) => onChange(e.target.value.split("\n"))} />;
    case "image": return <ImageField value={value} onChange={onChange} folder={folder} />;
    case "switch": return (
      <button type="button" role="switch" aria-checked={!!value} onClick={() => onChange(!value)} className={`flex h-7 w-14 items-center rounded-full p-1 transition ${value ? "bg-[#1739D1]" : "bg-[#1739D1]/20"}`}>
        <span className={`h-5 w-5 rounded-full bg-white transition ${value ? "translate-x-7 bg-[#FFD21A]" : ""}`} />
      </button>
    );
    default: return <input className="form-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
  }
}

export default function CollectionManager({ name }: { name: CollectionName }) {
  const schema = schemas[name];
  const { items, loading, error } = useAdminCollection(name);
  const rows = items as unknown as Row[];
  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<Row | null>(null);
  const [seeding, setSeeding] = useState(false);

  const nextOrder = useMemo(() => (rows.length ? Math.max(...rows.map((r) => r.order ?? 0)) + 1 : 1), [rows]);

  const open = (row: Row | "new") => {
    setEditing(row);
    setForm(row === "new" ? { ...schema.newDefaults } : { ...row });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const missing = schema.fields.find((f) => f.required && !String(form[f.name] ?? "").trim());
    if (missing) { toast.error(`Le champ « ${missing.label} » est obligatoire.`); return; }
    setSaving(true);
    try {
      const data: Record<string, any> = { ...form };
      for (const f of schema.fields) if (f.type === "lines") data[f.name] = (data[f.name] ?? []).map((l: string) => l.trim()).filter(Boolean);
      if (schema.hasSlug) {
        let slug = slugify(String(data.slug || data[schema.titleField] || ""));
        if (!slug) slug = `${name}-${Date.now()}`;
        const taken = new Set(rows.filter((r) => r.id !== (editing as Row)?.id).map((r) => r.slug));
        let candidate = slug, n = 2;
        while (taken.has(candidate)) candidate = `${slug}-${n++}`;
        data.slug = candidate;
      }
      data.published = data.published !== false;
      if (editing === "new") data.order = nextOrder;
      await saveItem(name, editing === "new" ? null : (editing as Row).id, data);
      toast.success(editing === "new" ? "Élément créé." : "Modifications enregistrées.");
      setEditing(null);
    } catch (e) {
      toast.error((e as Error).message || "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const a = rows[index], b = rows[index + dir];
    if (!a || !b) return;
    // order identiques (données importées) : on les renumérote pour que l'échange fonctionne
    const oa = a.order, ob = b.order === a.order ? a.order + dir : b.order;
    try { await swapOrder(name, { id: a.id, order: oa }, { id: b.id, order: ob }); } catch (e) { toast.error((e as Error).message); }
  };

  const doSeed = async () => {
    setSeeding(true);
    try { const n = await seedCollection(name); toast.success(`${n} élément(s) importé(s).`); } catch (e) { toast.error((e as Error).message); }
    setSeeding(false);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow">Gestion du contenu</div>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-.05em]">{schema.label}</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {!loading && rows.length === 0 && (
            <button onClick={doSeed} disabled={seeding} className="flex items-center gap-2 border border-[#1739D1]/30 px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] disabled:opacity-50">
              {seeding ? <Loader2 size={14} className="animate-spin" /> : <DownloadCloud size={14} />} Importer le contenu actuel
            </button>
          )}
          <button onClick={() => open("new")} className="flex items-center gap-2 bg-[#FFD21A] px-5 py-3 text-[11px] font-bold uppercase tracking-[.12em] transition hover:bg-[#1739D1] hover:text-white">
            <Plus size={15} /> Ajouter
          </button>
        </div>
      </div>

      {error && <p className="mb-6 bg-red-50 p-4 text-sm text-red-800">Lecture impossible : {error}. Vérifiez les règles Firestore.</p>}
      {loading ? <p className="text-sm opacity-60">Chargement…</p> : rows.length === 0 ? (
        <p className="border border-dashed border-[#1739D1]/25 p-10 text-center text-sm opacity-70">
          Aucun élément. Le site affiche actuellement son contenu par défaut. Importez-le pour pouvoir le modifier, ou ajoutez le vôtre.
        </p>
      ) : (
        <ul className="grid gap-3">
          {rows.map((row, i) => (
            <li key={row.id} className="flex flex-wrap items-center gap-4 bg-white p-4 shadow-[0_10px_30px_rgba(23,57,209,.05)]">
              {schema.imageField && (
                <div className="h-14 w-14 shrink-0 overflow-hidden bg-[#EEF2F8]">
                  {row[schema.imageField] && <img src={optimize(row[schema.imageField], 120)} alt="" className="h-full w-full object-cover" />}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-lg font-bold tracking-[-.03em]">{row[schema.titleField]}</div>
                <div className="truncate text-xs opacity-60">{schema.subtitleField ? row[schema.subtitleField] : ""}</div>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${row.published ? "bg-[#E6F6EC] text-[#14663A]" : "bg-[#F1ECE0] text-[#7A5B00]"}`}>{row.published ? "Publié" : "Brouillon"}</span>
              <div className="flex items-center gap-1">
                <button aria-label="Monter" disabled={i === 0} onClick={() => move(i, -1)} className="p-2 disabled:opacity-25"><ArrowUp size={16} /></button>
                <button aria-label="Descendre" disabled={i === rows.length - 1} onClick={() => move(i, 1)} className="p-2 disabled:opacity-25"><ArrowDown size={16} /></button>
                <button aria-label="Modifier" onClick={() => open(row)} className="p-2 text-[#1739D1]"><Pencil size={16} /></button>
                <button aria-label="Supprimer" onClick={() => setToDelete(row)} className="p-2 text-red-700"><Trash2 size={16} /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-[70] flex justify-end bg-[#10175C]/60 backdrop-blur-sm" role="dialog" aria-modal="true">
          <form onSubmit={submit} className="flex h-full w-full max-w-2xl flex-col bg-[#F6F3EC]">
            <div className="flex items-center justify-between border-b border-[#1739D1]/15 px-6 py-5">
              <h2 className="font-display text-2xl font-bold tracking-[-.04em]">{editing === "new" ? `Nouvelle ${schema.singular}` : `Modifier : ${schema.singular}`}</h2>
              <button type="button" onClick={() => setEditing(null)} aria-label="Fermer"><X /></button>
            </div>
            <div className="grid flex-1 gap-6 overflow-y-auto px-6 py-6">
              {schema.fields.map((f) => (
                <label key={f.name} className="grid gap-2 text-[11px] font-bold uppercase tracking-[.12em]">
                  {f.label}{f.required && <span className="text-[#6B118E]"> *</span>}
                  <div className="text-sm font-normal normal-case tracking-normal">
                    <FieldInput field={f} value={form[f.name]} folder={schema.folder} onChange={(v) => setForm((s) => ({ ...s, [f.name]: v }))} />
                  </div>
                  {f.hint && <span className="text-[11px] font-normal normal-case tracking-normal opacity-55">{f.hint}</span>}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 border-t border-[#1739D1]/15 px-6 py-4">
              <button type="button" onClick={() => setEditing(null)} className="px-5 py-3 text-xs font-bold uppercase tracking-[.12em]">Annuler</button>
              <button disabled={saving} className="flex items-center gap-2 bg-[#1739D1] px-6 py-3 text-xs font-bold uppercase tracking-[.12em] text-white disabled:opacity-60">
                {saving && <Loader2 size={14} className="animate-spin" />} Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      {toDelete && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#10175C]/60 p-4" role="alertdialog" aria-modal="true">
          <div className="w-full max-w-md bg-white p-8">
            <h3 className="font-display text-2xl font-bold tracking-[-.04em]">Supprimer cet élément ?</h3>
            <p className="mt-3 text-sm opacity-70">« {toDelete[schema.titleField]} » sera définitivement supprimé. Pour le masquer seulement, passez-le en brouillon.</p>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setToDelete(null)} className="px-5 py-3 text-xs font-bold uppercase tracking-[.12em]">Annuler</button>
              <button onClick={async () => { try { await removeItem(name, toDelete.id); toast.success("Élément supprimé."); } catch (e) { toast.error((e as Error).message); } setToDelete(null); }}
                className="bg-red-700 px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-white">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
