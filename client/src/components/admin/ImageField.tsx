import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { isCloudinaryConfigured, optimize, uploadImage } from "@/lib/cloudinary";

export default function ImageField({ value, onChange, folder }: { value?: string; onChange: (url: string) => void; folder: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleFile = async (file?: File) => {
    if (!file) return;
    setError("");
    setProgress(0);
    try {
      const result = await uploadImage(file, folder, setProgress);
      onChange(result.url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setProgress(null);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-24 w-32 items-center justify-center overflow-hidden border border-[#1739D1]/15 bg-[#EEF2F8]">
          {value ? <img src={optimize(value, 300)} alt="" className="h-full w-full object-cover" /> : <ImagePlus className="text-[#1739D1]/30" />}
        </div>
        <div className="grid gap-2">
          <button type="button" disabled={progress !== null || !isCloudinaryConfigured} onClick={() => input.current?.click()}
            className="flex w-fit items-center gap-2 bg-[#1739D1] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#6B118E] disabled:opacity-50">
            {progress !== null ? <><Loader2 size={14} className="animate-spin" /> {progress}%</> : <><ImagePlus size={14} /> {value ? "Remplacer" : "Téléverser"}</>}
          </button>
          {value && <button type="button" onClick={() => onChange("")} className="flex w-fit items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em] text-red-700"><Trash2 size={13} /> Retirer</button>}
        </div>
        <input ref={input} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
      </div>
      {!isCloudinaryConfigured && <p className="text-xs text-red-700">Cloudinary non configuré : ajoutez VITE_CLOUDINARY_CLOUD_NAME et VITE_CLOUDINARY_UPLOAD_PRESET.</p>}
      {error && <p className="text-xs text-red-700">{error}</p>}
      <input className="form-input text-xs" placeholder="…ou collez l'URL d'une image" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
