/* HQL Consulting — pages de services alignées sur les cartes Expertises de l’accueil. */
import { ArrowUpRight, Check, MoveRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { useItem } from "@/lib/content";

function Wave({ color }: { color: string }) {
  return (
    <div className="relative z-10 -mb-px overflow-hidden leading-[0]" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block h-16 w-full md:h-24" fill={color}>
        <path d="M0 38 C180 92 355 5 565 43 C780 82 940 13 1130 48 C1260 71 1360 57 1440 22 L1440 100 L0 100 Z" />
      </svg>
    </div>
  );
}

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const { item: service, loading } = useItem("services", params?.slug);
  if (loading) return <div className="min-h-screen bg-[#F6F3EC]"><SiteNav /></div>;
  if (!service) return <NotFound />;
  const isTraining = service.isTraining;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F3EC] text-[#1739D1]">
      <SEO title={`${service.title} — HQL Consulting`} description={service.intro} />
      <SiteNav />

      <main>
        <section className="relative isolate overflow-hidden bg-[#1739D1] pb-24 pt-24 text-white lg:pb-32 lg:pt-32">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-12 -top-20 h-[340px] w-[340px] rounded-full border border-[#FFD21A]/20" />
          <div className="pointer-events-none absolute bottom-0 right-[12%] h-px w-[32%] bg-white/15" />
          <div className="pointer-events-none absolute right-[12%] top-0 h-full w-px bg-white/10" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(255,210,26,0.10),transparent_24%),linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.04)_48%,transparent_49%)]" />

          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12">
            <div className="grid min-h-[470px] gap-12 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#FFD21A]"><span className="h-px w-10 bg-[#FFD21A]" /> {service.no} / {service.tag}</div>
                <div className="mt-12 max-w-xs border-l border-white/30 pl-5 text-sm leading-7 text-white/65">Une expertise structurée.<br />Des recommandations utiles.<br />Une mise en œuvre accompagnée.</div>
              </div>
              <div>
                <h1 className="max-w-5xl font-display text-5xl font-bold leading-[.92] tracking-[-.07em] sm:text-7xl lg:text-8xl">{service.title}<span className="font-serif font-normal italic text-[#FFD21A]">.</span></h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">{service.intro}</p>
              </div>
            </div>
          </div>
        </section>

        <Wave color="#F6F3EC" />

        <section className="bg-[#F6F3EC] py-20 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-16 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-12">
            <div>
              <div className="eyebrow">02 / Notre accompagnement</div>
              <div className="mt-8 font-display text-8xl font-bold leading-none tracking-[-.1em] text-[#1739D1]/10">{service.no}</div>
              <div className="mt-[-12px] text-[10px] font-bold uppercase tracking-[.16em] text-[#6B118E]">{service.audience}</div>
            </div>
            <div>
              <h2 className="max-w-3xl font-display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-6xl">{service.promise}</h2>
              <div className="mt-12 grid gap-4 border-t border-[#1739D1]/20 pt-8 sm:grid-cols-2">{service.points.map((point) => <div key={point} className="flex gap-3 text-sm leading-7 text-[#1739D1]/75"><Check size={18} className="mt-1 shrink-0 text-[#6B118E]" />{point}</div>)}</div>
              <Link href={isTraining ? "/#catalogue" : "/contact"} className="mt-12 flex w-fit items-center gap-3 bg-[#FFD21A] px-5 py-4 text-xs font-bold uppercase tracking-[.13em] text-[#1739D1] transition hover:bg-[#6B118E] hover:text-white">{isTraining ? "Voir le catalogue" : "Parler de votre besoin"} <ArrowUpRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="bg-[#EEF2F8] py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
              <div><div className="eyebrow text-[#6B118E]">03 / Résultat attendu</div><h2 className="mt-6 max-w-xl font-display text-4xl font-bold leading-[.96] tracking-[-.06em] sm:text-6xl">Une expertise qui produit une <span className="font-serif font-normal italic text-[#6B118E]">avancée concrète.</span></h2></div>
              <div className="border-l-2 border-[#FFD21A] pl-7 sm:pl-10"><p className="max-w-2xl text-xl leading-9 text-[#1739D1]/75">{service.result}</p></div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#E6EBFF] py-20 lg:py-28">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#6B118E]/20" />
          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><div className="eyebrow text-[#6B118E]">04 / Une méthode lisible</div><h2 className="mt-6 max-w-xl font-display text-4xl font-bold leading-[.96] tracking-[-.06em] sm:text-6xl">De l’analyse à la décision, puis de la décision à <span className="font-serif font-normal italic text-[#6B118E]">l’action.</span></h2></div><div className="grid gap-5 sm:grid-cols-3"><div className="border-t-2 border-[#FFD21A] pt-5"><div className="font-display text-3xl font-bold">01</div><div className="mt-3 text-sm leading-6 text-[#1739D1]/65">Comprendre le contexte, les enjeux et les contraintes.</div></div><div className="border-t-2 border-[#6B118E] pt-5"><div className="font-display text-3xl font-bold">02</div><div className="mt-3 text-sm leading-6 text-[#1739D1]/65">Structurer les options et formuler des recommandations.</div></div><div className="border-t-2 border-[#1739D1] pt-5"><div className="font-display text-3xl font-bold">03</div><div className="mt-3 text-sm leading-6 text-[#1739D1]/65">Accompagner la mise en œuvre et le suivi.</div></div></div></div></div>
        </section>

        <section className="bg-[#FFD21A] py-16"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 md:flex-row md:items-center lg:px-12"><div><div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#6B118E]">05 / Prochaine étape</div><h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-[-.05em] text-[#1739D1] sm:text-4xl">Votre enjeu mérite un échange précis.</h2></div><Link href="/contact" className="flex w-fit items-center gap-3 bg-[#1739D1] px-5 py-4 text-xs font-bold uppercase tracking-[.13em] text-white transition hover:bg-[#1228A0]">Échanger avec HQL <MoveRight size={16} /></Link></div></section>
      </main>

      <SiteFooter />
    </div>
  );
}
