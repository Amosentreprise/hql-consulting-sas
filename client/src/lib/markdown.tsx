/* Mini-rendu Markdown sûr (aucun HTML brut) : titres, listes, citations, gras, italique, liens. */
import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\((?:https?:\/\/|mailto:|\/)[^)\s]+\))/g;
  return text.split(re).filter(Boolean).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]} className="font-semibold underline decoration-[#FFD21A] decoration-2 underline-offset-4" target={link[2].startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener">{link[1]}</a>;
    return part;
  });
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r/g, "").split(/\n{2,}/);
  return (
    <div className="space-y-6 text-base leading-8 text-[#1739D1]/80">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (!lines.length) return null;
        const first = lines[0];
        if (/^###\s/.test(first)) return <h3 key={i} className="pt-4 font-display text-xl font-bold tracking-[-.03em] text-[#1739D1]">{inline(first.replace(/^###\s/, ""))}</h3>;
        if (/^##\s/.test(first)) return <h2 key={i} className="pt-6 font-display text-3xl font-bold tracking-[-.05em] text-[#1739D1]">{inline(first.replace(/^##\s/, ""))}</h2>;
        if (/^#\s/.test(first)) return <h2 key={i} className="pt-6 font-display text-3xl font-bold tracking-[-.05em] text-[#1739D1]">{inline(first.replace(/^#\s/, ""))}</h2>;
        if (lines.every((l) => /^[-*]\s/.test(l))) return <ul key={i} className="list-disc space-y-2 pl-6 marker:text-[#6B118E]">{lines.map((l, j) => <li key={j}>{inline(l.replace(/^[-*]\s/, ""))}</li>)}</ul>;
        if (lines.every((l) => /^\d+\.\s/.test(l))) return <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-bold marker:text-[#6B118E]">{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\.\s/, ""))}</li>)}</ol>;
        if (lines.every((l) => /^>\s?/.test(l))) return <blockquote key={i} className="border-l-2 border-[#FFD21A] pl-6 text-xl italic">{inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}</blockquote>;
        return <p key={i}>{inline(lines.join(" "))}</p>;
      })}
    </div>
  );
}
