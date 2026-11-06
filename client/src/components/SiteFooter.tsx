import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#1739D1] py-16 text-white lg:py-20">
      <div className="pointer-events-none absolute -right-10 -top-24 select-none font-display text-[18rem] font-bold leading-none tracking-[-0.15em] text-white/[0.05]">
        HQL
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-1/3 bg-[#FFD21A]/70" />

      <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_.9fr_.8fr] lg:gap-20">
          <div>
            <Link href="/" className="flex w-fit items-center bg-white px-2 py-1" aria-label="HQL Consulting — Accueil">
              <img
                src="/images/hql-official-logo_81614e28.png"
                alt="HIGH QUALITY LEVEL CONSULTING"
                className="h-14 w-[52px] object-contain"
              />
            </Link>

            <div className="mt-7 text-[10px] font-bold uppercase tracking-[.18em] text-[#FFD21A]">
              HIGH QUALITY LEVEL CONSULTING
            </div>

            <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[.95] tracking-[-.06em] sm:text-6xl">
              Des expertises pluridisciplinaires pour des décisions plus
              <span className="font-serif font-normal italic text-[#FFD21A]"> solides.</span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/65">
              Conseil, audit, comptabilité, fiscalité, financement et formation
              professionnelle au service des entreprises, ONG, associations et
              institutions.
            </p>

            <Link
              href="/contact"
              className="mt-8 flex w-fit items-center gap-3 bg-[#FFD21A] px-5 py-4 text-xs font-bold uppercase tracking-[.12em] text-[#1739D1] transition hover:bg-white"
            >
              Échanger avec HQL
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="lg:pt-16">
            <div className="mb-6 text-[10px] font-bold uppercase tracking-[.18em] text-[#FFD21A]">
              Coordonnées
            </div>

            <div className="grid gap-5 text-sm leading-6 text-white/70">
              <div className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-[#FFD21A]" size={16} />
                <address className="not-italic">
                  C/193-194 Scoa Gbeto
                  <br />
                  Steinmetz — Immeuble Octogone
                  <br />
                  04 BP 0823 Cadjehoun — Bénin
                </address>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-1 shrink-0 text-[#FFD21A]" size={16} />
                <a href="tel:+2290196388835" className="transition hover:text-white">
                  01 96 38 88 35
                  <br />
                  01 52 67 96 96
                </a>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-1 shrink-0 text-[#FFD21A]" size={16} />
                <a href="mailto:contact@hqlconsulting.net" className="transition hover:text-white">
                  contact@hqlconsulting.net
                </a>
              </div>
            </div>
          </div>

          <div className="lg:pt-16">
            <div className="mb-6 text-[10px] font-bold uppercase tracking-[.18em] text-[#FFD21A]">
              Explorer
            </div>

            <nav className="grid gap-3 text-sm text-white/70" aria-label="Navigation du pied de page">
              <Link href="/a-propos" className="transition hover:text-white">Le cabinet</Link>
              <Link href="/#expertises" className="transition hover:text-white">Nos métiers</Link>
              <Link href="/#catalogue" className="transition hover:text-white">Formations</Link>
              <Link href="/ressources" className="transition hover:text-white">Ressources</Link>
              <Link href="/realisations" className="transition hover:text-white">Réalisations</Link>
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
            </nav>

            <div className="mt-8 border-t border-white/15 pt-6">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#FFD21A]">
                Domaines
              </div>
              <p className="text-xs leading-6 text-white/50">
                Études et conseil · Audit et contrôle · Comptabilité et fiscalité
                · Formation professionnelle
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[.14em] text-white/40 sm:flex-row">
          <span>© HQL Consulting</span>
          <Link href="/admin/login" className="transition hover:text-white">Espace équipe</Link>
          <span className="text-[#FFD21A]">Built for better decisions.</span>
        </div>
      </div>
    </footer>
  );
}
