import { ArrowUpRight, MoveRight } from "lucide-react";
import { Link } from "wouter";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useCollection } from "@/lib/content";
import { optimize } from "@/lib/cloudinary";



export default function Projects() {
  const { items: cases } = useCollection("projects");
  return <div className="min-h-screen bg-[#F6F3EC] text-[#1739D1]">
   <SiteNav />
    <main><section className="relative isolate overflow-hidden bg-[#1739D1] py-24 text-white lg:py-32">
  {/* Décors graphiques légers */}
  <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
  <div className="pointer-events-none absolute -right-12 -top-20 h-[340px] w-[340px] rounded-full border border-[#FFD21A]/20" />
  <div className="pointer-events-none absolute bottom-0 right-[12%] h-px w-[32%] bg-white/15" />
  <div className="pointer-events-none absolute right-[12%] top-0 h-full w-px bg-white/10" />

  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(255,210,26,0.10),transparent_24%),linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.04)_48%,transparent_49%)]" />

  <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12">
    <div className="grid min-h-[500px] gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
      <div>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD21A]">
          <span className="h-px w-10 bg-[#FFD21A]" />
          01 / Réalisations
        </div>

        <p className="mt-12 max-w-xs border-l border-white/30 pl-5 text-sm leading-7 text-white/65">
          Des interventions pensées pour produire des décisions plus solides.
        </p>
      </div>

      <div>
        <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.92] tracking-[-0.07em] sm:text-7xl lg:text-8xl">
          Les enjeux deviennent plus clairs quand on les{" "}
          <span className="font-serif font-normal italic text-[#FFD21A]">
            travaille ensemble.
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-8 text-white/70">
          Découvrez notre manière d’aborder les situations complexes. Les
          références et résultats présentés seront enrichis avec vos cas
          clients validés.
        </p>
      </div>
    </div>
  </div>
</section>

    <section className="py-20 lg:py-28"><div className="mx-auto max-w-[1440px] px-5 lg:px-12"><div className="mb-14 flex items-end justify-between gap-8"><div><div className="eyebrow">02 / Études de cas</div><h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[.96] tracking-[-.06em] sm:text-6xl">Des trajectoires, pas seulement des <span className="font-serif font-normal italic text-[#6B118E]">livrables.</span></h2></div><span className="hidden text-[10px] font-bold uppercase tracking-[.16em] text-[#6B118E] md:block">HQL / Portfolio</span></div><div className="grid gap-6 lg:grid-cols-3">{cases.map((item, index) => { const no = String(index + 1).padStart(2, "0"); return <article key={item.id} className={`group flex min-h-[460px] flex-col justify-between p-7 lg:p-9 ${item.tone === "purple" ? "bg-[#6B118E] text-white" : item.tone === "yellow" ? "bg-[#FFD21A] text-[#1739D1]" : "bg-[#1739D1] text-white"}`}><div>{item.image && <img src={optimize(item.image, 700)} alt="" className="-mx-7 -mt-7 mb-6 h-44 w-[calc(100%+3.5rem)] max-w-none object-cover lg:-mx-9 lg:-mt-9 lg:w-[calc(100%+4.5rem)]" />}<div className="flex justify-between text-[10px] font-bold uppercase tracking-[.15em] opacity-75"><span>{no} / {item.sector}</span><ArrowUpRight size={16} /></div><h3 className="mt-20 font-display text-3xl font-bold leading-[.98] tracking-[-.05em]">{item.title}</h3><p className="mt-5 text-sm leading-7 opacity-70">{item.text}</p></div><div><div className="mb-6 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="border border-current/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[.1em]">{tag}</span>)}</div><Link href={`/realisations/${item.slug}`} className="flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[.13em]">Voir la fiche <MoveRight size={16} /></Link></div></article>; })}</div></div></section><section className="bg-[#E6EBFF] py-16"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 md:flex-row md:items-center lg:px-12"><div><div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#6B118E]">Votre enjeu mérite son propre récit</div><h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em]">Construisons la prochaine réalisation.</h2></div><Link href="/contact" className="flex w-fit items-center gap-3 bg-[#FFD21A] px-5 py-4 text-xs font-bold uppercase tracking-[.13em] text-[#1739D1]">Parler de votre projet <ArrowUpRight size={16} /></Link></div></section></main><SiteFooter /></div>;
}
