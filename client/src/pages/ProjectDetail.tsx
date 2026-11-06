import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { useItem } from "@/lib/content";
import { optimize } from "@/lib/cloudinary";
import { Markdown } from "@/lib/markdown";

export default function ProjectDetail() {
  const [, params] = useRoute("/realisations/:slug");
  const { item, loading } = useItem("projects", params?.slug);

  if (loading) return <div className="min-h-screen bg-[#F6F3EC]"><SiteNav /></div>;
  if (!item) return <NotFound />;

  const sections = [
    ["Contexte et enjeu", item.challenge],
    ["Démarche HQL", item.approach],
    ["Résultats", item.results],
  ].filter(([, body]) => body?.trim()) as [string, string][];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F3EC] text-[#1739D1]">
      <SEO title={`${item.title} — Réalisations HQL Consulting`} description={item.text} image={item.image ? optimize(item.image, 1200) : undefined} />
      <SiteNav />
      <main>
        <section className="relative bg-[#1739D1] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
            <Link href="/realisations" className="flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#FFD21A]"><ArrowLeft size={14} /> Toutes les réalisations</Link>
            <div className="mt-12 text-[10px] font-bold uppercase tracking-[.16em] text-[#FFD21A]">{item.sector}{item.client ? ` · ${item.client}` : ""}</div>
            <h1 className="mt-6 max-w-5xl font-display text-4xl font-bold leading-[.95] tracking-[-.06em] sm:text-6xl lg:text-7xl">{item.title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">{item.text}</p>
            <div className="mt-8 flex flex-wrap gap-2">{item.tags?.map((t) => <span key={t} className="border border-white/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[.1em]">{t}</span>)}</div>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-5 py-16 lg:py-24">
          {item.image && <img src={optimize(item.image, 1600)} alt="" className="mb-16 w-full object-cover" />}
          {sections.length ? sections.map(([title, body], i) => (
            <section key={title} className="mb-14 grid gap-6 border-t border-[#1739D1]/20 pt-8 lg:grid-cols-[.4fr_1fr]">
              <div><div className="eyebrow">0{i + 1}</div><h2 className="mt-4 font-display text-2xl font-bold tracking-[-.04em]">{title}</h2></div>
              <Markdown source={body} />
            </section>
          )) : <p className="border-l-2 border-[#FFD21A] pl-6 text-lg">La fiche détaillée de cette réalisation sera bientôt disponible.</p>}
          <Link href="/contact" className="flex w-fit items-center gap-3 bg-[#FFD21A] px-5 py-4 text-xs font-bold uppercase tracking-[.13em]">Parler de votre projet <ArrowUpRight size={16} /></Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
