import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#1739D1]">
      <SEO title="Page introuvable — HQL Consulting" description="La page demandée n’existe pas ou a été déplacée." />
      
      <SiteNav />
      <main className="relative overflow-hidden bg-[#1739D1] py-28 text-white lg:py-40">
        <div className="pointer-events-none absolute -right-10 -top-10 font-display text-[22rem] font-bold leading-none tracking-[-.15em] text-white/[.06]">404</div>
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12">
          <div className="eyebrow text-[#FFD21A]">Erreur 404</div>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">
            Cette page est <span className="font-serif font-normal italic text-[#FFD21A]">introuvable.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">Le lien est peut-être erroné, ou la page a été déplacée. Revenez à l’accueil ou contactez-nous.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="flex items-center gap-3 bg-[#FFD21A] px-5 py-4 text-xs font-bold uppercase tracking-[.13em] text-[#1739D1] transition hover:bg-white">Retour à l’accueil <ArrowUpRight size={16} /></Link>
            <Link href="/contact" className="flex items-center gap-3 border border-white/40 px-5 py-4 text-xs font-bold uppercase tracking-[.13em] transition hover:bg-white hover:text-[#1739D1]">Nous contacter</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
