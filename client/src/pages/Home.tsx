import { COMPANY_NAME, DEVELOPER_NAME, DEVELOPER_URL } from "@/lib/site";
/* HQL Consulting — page d’accueil institutionnelle premium
   Contenu aligné sur la présentation officielle du cabinet.
*/
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MoveRight,
  Phone,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import SiteNav from "@/components/SiteNav";
import { submitMessage, useCollection } from "@/lib/content";
import { optimize } from "@/lib/cloudinary";

const positioningPoints = [
  ["Pluridisciplinaire", "Une plateforme d’expertise réunissant conseil, audit, comptabilité, fiscalité, financement et formation."],
  ["Adaptée à vos réalités", "Un accompagnement construit autour de la singularité de chaque entreprise, projet ou organisation."],
  ["Orientée vers l’action", "Des recommandations conçues pour être comprises, mises en œuvre et suivies dans la durée."],
];

const heroSlides = [
  {
    kicker: "Conseil · Audit · Formation",
    title: <>Des expertises structurées pour des <em className="font-serif font-normal tracking-[-0.06em] text-[#FFD21A]">décisions plus solides.</em></>,
    body: "HQL Consulting accompagne les entreprises, ONG, associations et institutions dans leurs enjeux stratégiques, financiers et opérationnels.",
    cta: "Parler à un expert",
    image: "/images/hql-hero_8b1a23ab.jpg",
    index: "01",
    label: "Expertise · Méthode · Confiance",
  },
  {
    kicker: "Études et conseil",
    title: <>Transformer vos enjeux en une <em className="font-serif font-normal tracking-[-0.06em] text-[#FFD21A]">trajectoire lisible.</em></>,
    body: "De la structuration de vos activités à la recherche de financements adaptés, nous vous aidons à avancer avec méthode.",
    cta: "Découvrir nos métiers",
    image: "/images/hql-impact_4c2d841c.jpg",
    index: "02",
    label: "Stratégie · Structuration · Impact",
  },
  {
    kicker: "Comptabilité · Fiscalité · Gestion",
    title: <>Donner à vos chiffres la clarté nécessaire pour <em className="font-serif font-normal tracking-[-0.06em] text-[#FFD21A]">mieux piloter.</em></>,
    body: "Comptes annuels, déclarations, reporting, diagnostic financier et accompagnement des décisions clés de votre organisation.",
    cta: "Voir les expertises",
    image: "/images/hql-training_ea129d0e.jpg",
    index: "03",
    label: "Rigueur · Clarté · Pilotage",
  },
  {
    kicker: "Formation professionnelle",
    title: <>Renforcer les compétences qui font <em className="font-serif font-normal tracking-[-0.06em] text-[#FFD21A]">progresser vos équipes.</em></>,
    body: "Des formations pratiques en comptabilité, gestion, fiscalité et SYSCEBNL, conçues pour produire des réflexes opérationnels.",
    cta: "Découvrir les formations",
    image: "/images/hql-team_0b876177.jpg",
    index: "04",
    label: "Transmission · Compétence · Progrès",
  },
];

function Logo() {
  return (
    <div className="flex w-fit items-center bg-white px-2 py-1">
      <img
        src="/images/hql-official-logo_81614e28.png"
        alt="HQL Consulting"
        className="h-14 w-[52px] object-contain"
      />
    </div>
  );
}

function Wave({ color, flip = false }: { color: string; flip?: boolean }) {
  return (
    <div
      className={`relative z-10 -mb-px overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-16 w-full md:h-24"
        fill={color}
      >
        <path d="M0 38 C180 92 355 5 565 43 C780 82 940 13 1130 48 C1260 71 1360 57 1440 22 L1440 100 L0 100 Z" />
      </svg>
    </div>
  );
}

const trustSlides = [
  { no: "01", label: "ONG · Association · Projet de développement" },
  { no: "02", label: "Entreprise · PME · Organisation" },
  { no: "03", label: "Institution · Réseau · Partenaire" },
];

function TrustSlider() {
  const { items: partners } = useCollection("partners");
  const [activeTrust, setActiveTrust] = useState(0);
  const slide = trustSlides[activeTrust];

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveTrust((current) => (current + 1) % trustSlides.length),
      5000,
    );
  return () => window.clearInterval(timer);
  }, []);

  if (partners.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      <div className="absolute right-0 top-0 h-full w-1/4 bg-[#EEF2F8]" />
      <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div>
            <div className="eyebrow text-[#6B118E]">07 / Références et relations</div>
            <h2 className="mt-6 max-w-md font-display text-4xl font-bold leading-[.96] tracking-[-.06em] sm:text-6xl">
              Des relations bâties sur la <span className="font-serif font-normal italic text-[#6B118E]">confiance.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#1739D1]/60">
              HQL intervient auprès d’entreprises, d’ONG, d’associations, de projets de développement et d’institutions.
            </p>
          </div>

          {partners.length > 0 ? (
            <div className="grid grid-cols-2 gap-px border-l-2 border-[#FFD21A] bg-[#1739D1]/10 pl-0 sm:grid-cols-3 lg:grid-cols-4">
              {partners.map((p) => {
                const logo = <img src={optimize(p.logo, 300)} alt={p.name} loading="lazy" className="max-h-14 max-w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />;
                return <div key={p.id} className="flex h-28 items-center justify-center bg-white p-5">{p.logo ? (p.url ? <a href={p.url} target="_blank" rel="noreferrer noopener" aria-label={p.name}>{logo}</a> : logo) : <span className="text-center text-[10px] font-bold uppercase tracking-[.12em] text-[#1739D1]/50">{p.name}</span>}</div>;
              })}
            </div>
          ) : (<div className="relative min-h-[220px] border-l-2 border-[#FFD21A] pl-7 sm:pl-12">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[.16em] text-[#6B118E]">
                  Sélection {slide.no} / {slide.label}
                </div>
                <div className="mt-8 flex h-24 w-64 items-center justify-center border border-dashed border-[#1739D1]/25 bg-[#F6F3EC] px-5 text-center text-[10px] font-bold uppercase tracking-[.14em] text-[#1739D1]/40">
                  Logos officiels à intégrer après validation
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTrust((activeTrust + trustSlides.length - 1) % trustSlides.length)}
                  className="flex h-10 w-10 items-center justify-center border border-[#1739D1]/20 text-[#1739D1] transition hover:bg-[#1739D1] hover:text-white"
                  aria-label="Référence précédente"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveTrust((activeTrust + 1) % trustSlides.length)}
                  className="flex h-10 w-10 items-center justify-center bg-[#1739D1] text-white transition hover:bg-[#6B118E]"
                  aria-label="Référence suivante"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2">
              {trustSlides.map((item, index) => (
                <button
                  key={item.no}
                  onClick={() => setActiveTrust(index)}
                  className={`h-1 transition-all ${index === activeTrust ? "w-12 bg-[#FFD21A]" : "w-6 bg-[#1739D1]/20"}`}
                  aria-label={`Afficher la sélection ${item.no}`}
                />
              ))}
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

function AppointmentModal({ onClose }: { onClose: () => void }) {
  const { items: modalServices } = useCollection("services");
  const startedAt = useRef(Date.now());
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10175C]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="appointment-title">
      <div className="relative w-full max-w-xl bg-[#F6F3EC] p-7 shadow-2xl sm:p-10">
        <button onClick={onClose} className="absolute right-5 top-5 text-[#1739D1]/60 transition hover:text-[#1739D1]" aria-label="Fermer">
          <X size={20} />
        </button>
        <div className="mb-8">
          <div className="eyebrow mb-3 text-[#6B118E]">Échangeons sur votre besoin</div>
          <h2 id="appointment-title" className="font-display text-3xl font-bold tracking-[-0.05em] text-[#1739D1]">Parler à un expert.</h2>
          <p className="mt-3 text-sm leading-6 text-[#1739D1]/65">Présentez-nous votre enjeu. Nous vous répondrons avec un premier regard utile.</p>
        </div>
        <form className="grid gap-4" onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          if (data.get("website")) return;
          try {
            const subject = String(data.get("subject") || "");
            await submitMessage({ name: String(data.get("name")), email: String(data.get("email")), subject: subject.startsWith("Votre besoin") ? "Non précisé" : subject, message: String(data.get("message") || "(sans message)"), source: "modal-accueil", startedAt: startedAt.current });
            toast.success("Votre demande a bien été enregistrée.");
            onClose();
          } catch (error) { toast.error((error as Error).message || "Envoi impossible pour le moment."); }
        }}>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required className="form-input" placeholder="Nom et prénom" />
            <input name="email" required type="email" className="form-input" placeholder="Adresse e-mail" />
          </div>
          <select name="subject" className="form-input">
            <option>Votre besoin</option>
            {modalServices.map((sv) => <option key={sv.id}>{sv.title}</option>)}
            <option>Autre demande</option>
          </select>
          <textarea name="message" className="form-input min-h-28 resize-none" placeholder="En quelques mots, votre besoin..." />
          <p className="text-[11px] leading-5 text-[#1739D1]/55">En envoyant ce formulaire, vous acceptez que vos informations soient utilisées uniquement pour répondre à votre demande. <Link href="/confidentialite" onClick={onClose} className="underline">Politique de confidentialité</Link></p>
          <button className="mt-2 flex items-center justify-center gap-3 bg-[#1739D1] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#1228A0]" type="submit">
            Envoyer ma demande <MoveRight size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const { items: services } = useCollection("services");
  const { items: trainings } = useCollection("trainings");
  const { items: allResources } = useCollection("resources");
  const resources = allResources.filter((r) => r.content?.trim());
  const { items: partnersList } = useCollection("partners");
  const hasRefs = partnersList.length > 0;
  const resNo = String(7 + (hasRefs ? 1 : 0)).padStart(2, "0");
  const callNo = String(7 + (hasRefs ? 1 : 0) + (resources.length > 0 ? 1 : 0)).padStart(2, "0");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F3EC] text-[#1739D1]">
      {modalOpen && <AppointmentModal onClose={() => setModalOpen(false)} />}
      <SiteNav overlay />

      <main>
        <section className="relative min-h-[720px] overflow-hidden bg-[#1739D1] text-white" aria-roledescription="carousel" aria-label="Présentation de HQL Consulting">
          {heroSlides.map((slide, index) => (
            <div key={slide.index} className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === index ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={activeSlide !== index}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1739D1] via-[#1739D1]/80 to-[#1739D1]/25" />
            </div>
          ))}

          <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] items-end px-5 pb-16 pt-36 lg:px-12 lg:pb-24">
            <div className="max-w-4xl">
              <div key={heroSlides[activeSlide].index} className="animate-rise">
                <div className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FFD21A]"><span className="h-px w-12 bg-[#FFD21A]" /> {heroSlides[activeSlide].kicker}</div>
                <h1 className="max-w-4xl font-display text-[clamp(3.1rem,7.3vw,7.8rem)] font-bold leading-[0.9] tracking-[-0.075em]">{heroSlides[activeSlide].title}</h1>
                <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base">{heroSlides[activeSlide].body}</p>
                <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-center">
                  <button onClick={() => setModalOpen(true)} className="group flex w-fit items-center gap-5 bg-[#FFD21A] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#1739D1] transition hover:bg-white">{heroSlides[activeSlide].cta} <ArrowUpRight size={17} /></button>
                  <button onClick={() => scrollTo("expertises")} className="group flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-white/85">Découvrir nos expertises <MoveRight size={17} className="text-[#FFD21A]" /></button>
                </div>
              </div>
              <div className="mt-14 flex items-center gap-4 lg:hidden">
                {heroSlides.map((slide, index) => <button key={slide.index} onClick={() => setActiveSlide(index)} className={`h-1 transition-all ${activeSlide === index ? "w-10 bg-[#FFD21A]" : "w-5 bg-white/40"}`} aria-label={`Afficher la slide ${index + 1}`} />)}
              </div>
            </div>

            <div className="absolute bottom-10 right-5 hidden items-end gap-7 lg:flex">
              <div className="flex gap-2">{heroSlides.map((slide, index) => <button key={slide.index} onClick={() => setActiveSlide(index)} className={`h-1 transition-all ${activeSlide === index ? "w-12 bg-[#FFD21A]" : "w-6 bg-white/35 hover:bg-white/70"}`} aria-label={`Afficher la slide ${index + 1}`} />)}</div>
              <div className="text-right text-[10px] uppercase tracking-[0.2em] text-white/55"><span className="mr-3 text-[#FFD21A]">{heroSlides[activeSlide].index}</span>{heroSlides[activeSlide].label}</div>
              <div className="flex gap-2"><button onClick={() => setActiveSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)} className="border border-white/30 p-3 transition hover:border-[#FFD21A] hover:text-[#FFD21A]" aria-label="Slide précédente"><ArrowLeft size={16} /></button><button onClick={() => setActiveSlide((activeSlide + 1) % heroSlides.length)} className="border border-white/30 p-3 transition hover:border-[#FFD21A] hover:text-[#FFD21A]" aria-label="Slide suivante"><ArrowRight size={16} /></button></div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F6F3EC] py-20 lg:py-24">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-[#EEF2F8]" />
          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
              <div><div className="eyebrow">01 / Notre positionnement</div><p className="mt-7 max-w-xs text-sm leading-6 text-[#1739D1]/55">Une lecture pluridisciplinaire pour accompagner les organisations dans les moments qui comptent.</p></div>
              <div className="grid gap-6 border-l border-[#6B118E]/25 pl-6 sm:grid-cols-3">{positioningPoints.map(([title, text]) => <div key={title}><div className="font-display text-2xl font-bold tracking-[-0.06em] text-[#1739D1]">{title}</div><div className="mt-3 text-sm leading-6 text-[#6B118E]">{text}</div></div>)}</div>
            </div>
          </div>
        </section>

        <section id="cabinet" className="relative bg-[#F6F3EC] py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-16 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
            <div><div className="eyebrow">02 / Le cabinet</div><div className="mt-10 hidden border-l border-[#1739D1]/20 pl-5 text-xs leading-6 text-[#1739D1]/55 lg:block">Une plateforme d’expertise<br />au service de vos projets.</div></div>
            <div className="max-w-3xl"><h2 className="font-display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-6xl">Un partenaire stratégique pour les organisations qui veulent <span className="font-serif font-normal italic text-[#6B118E]">avancer avec méthode.</span></h2><p className="mt-8 max-w-2xl text-base leading-8 text-[#1739D1]/65">HQL Consulting accompagne les dirigeants d’entreprises, d’ONG, d’associations et d’institutions dans leurs choix stratégiques, financiers et opérationnels. Notre approche associe expertise technique, compréhension du terrain et accompagnement concret.</p><div className="mt-10 flex items-center gap-5"><Link href="/a-propos" className="flex items-center gap-3 border-b-2 border-[#FFD21A] pb-2 text-xs font-bold uppercase tracking-[0.12em]">Découvrir le cabinet <ArrowUpRight size={15} /></Link><span className="text-xs text-[#1739D1]/45">Conseil · Audit · Formation</span></div></div>
          </div>
        </section>

        <Wave color="#EEF2F8" />
        <section id="expertises" className="relative overflow-hidden bg-[#EEF2F8] py-24 text-[#1739D1] lg:py-32">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#6B118E]/10" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#1739D1]/10" />
          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12">
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="eyebrow text-[#6B118E]">03 / Nos métiers</div><h2 className="mt-7 max-w-2xl font-display text-4xl font-bold leading-[.96] tracking-[-.06em] sm:text-6xl">Des réponses précises aux enjeux qui <span className="font-serif font-normal italic text-[#6B118E]">comptent.</span></h2></div><p className="max-w-xs text-sm leading-6 text-[#1739D1]/60">Une expertise pluridisciplinaire, de la réflexion à la mise en œuvre.</p></div>
            <div className="grid gap-5 md:grid-cols-2">{services.map((service) => <Link key={service.id} href={`/services/${service.slug}`} className="group relative min-h-64 block overflow-hidden bg-white p-7 text-left shadow-[0_18px_50px_rgba(23,57,209,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(23,57,209,0.13)] lg:p-10"><span className="absolute bottom-0 left-0 top-0 w-1 bg-[#FFD21A] transition-all duration-300 group-hover:w-2" /><div className="flex items-start justify-between"><span className="font-display text-sm font-bold text-[#1739D1]">{service.no}</span><ArrowUpRight size={20} className="text-[#6B118E]/50 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#6B118E]" /></div><div className="mt-14"><div className="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#6B118E]">{service.tag}</div><h3 className="font-display text-2xl font-bold tracking-[-.04em] text-[#1739D1]">{service.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#1739D1]/60">{service.text}</p></div><span className="absolute bottom-0 left-0 h-1 w-0 bg-[#6B118E] transition-all duration-300 group-hover:w-full" /></Link>)}</div>
          </div>
        </section>

        <Wave color="#E6EBFF" />
        <section className="relative overflow-hidden bg-[#E6EBFF] py-20 lg:py-28"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#6B118E]/20" /><div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:px-12"><div><div className="eyebrow text-[#6B118E]">04 / Notre approche</div><h2 className="mt-7 max-w-lg font-display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-6xl">La méthode, avec une <span className="font-serif font-normal italic text-[#6B118E]">dimension humaine.</span></h2></div><div className="grid gap-8 border-l border-[#1739D1]/20 pl-7 sm:grid-cols-3 sm:gap-5">{positioningPoints.map(([title], index) => <div key={title}><div className="font-display text-4xl font-bold tracking-[-.08em] text-[#1739D1]">0{index + 1}</div><div className="mt-3 text-[11px] font-bold uppercase leading-4 tracking-[.12em] text-[#1739D1]/55">{title}</div></div>)}</div></div></section>

        <Wave color="#F6F3EC" flip />
        <section id="formations" className="bg-[#F6F3EC] py-24 lg:py-32"><div className="mx-auto grid max-w-[1440px] gap-14 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-12"><div><div className="eyebrow">05 / Formation professionnelle</div><h2 className="mt-7 max-w-md font-display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-6xl">Développer les compétences qui font <span className="font-serif font-normal italic text-[#6B118E]">progresser vos équipes.</span></h2><button onClick={() => scrollTo("catalogue")} className="mt-10 flex items-center gap-3 border-b-2 border-[#FFD21A] pb-2 text-xs font-bold uppercase tracking-[.12em]">Voir le catalogue <ArrowUpRight size={15} /></button></div><div className="relative overflow-hidden bg-[#1739D1] text-white"><div className="absolute inset-0 bg-[url('/images/hql-training_ea129d0e.jpg')] bg-cover bg-center opacity-35" /><div className="absolute inset-0 bg-[#1739D1]/55" /><div className="relative flex min-h-[390px] flex-col justify-between p-7 lg:p-10"><div className="flex items-center justify-between"><span className="bg-[#FFD21A] px-3 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#1739D1]">Formation pratique</span><span className="text-sm text-white/65">Sur mesure</span></div><div><div className="mb-4 flex gap-5 text-[10px] font-bold uppercase tracking-[.14em] text-[#FFD21A]"><span className="flex items-center gap-2"><Clock3 size={13} /> Comptabilité</span><span className="flex items-center gap-2"><CalendarDays size={13} /> Gestion · Fiscalité</span></div><h3 className="max-w-lg font-display text-3xl font-bold leading-tight tracking-[-.05em]">Des formations pensées pour produire des compétences directement mobilisables.</h3><button onClick={() => setModalOpen(true)} className="mt-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.12em]">Demander le programme <MoveRight size={16} className="text-[#FFD21A]" /></button></div></div></div></div></section>

        <section id="catalogue" className="relative overflow-hidden bg-[#E6EBFF] py-24 lg:py-32"><div className="absolute -left-20 top-20 h-56 w-56 rounded-full border-[18px] border-[#FFD21A]/40" /><div className="mx-auto max-w-[1440px] px-5 lg:px-12"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="eyebrow text-[#6B118E]">06 / Domaines de formation</div><h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[.96] tracking-[-.06em] text-[#1739D1] sm:text-6xl">Des formats utiles pour renforcer vos <span className="font-serif font-normal italic text-[#6B118E]">équipes.</span></h2></div><p className="max-w-xs text-sm leading-6 text-[#1739D1]/65">Des formations pratiques en comptabilité, gestion, fiscalité et SYSCEBNL.</p></div><div className="mt-14 grid gap-4 lg:grid-cols-3">{trainings.map((t, i) => { const tone = t.tone || (["blue", "yellow", "purple"] as const)[i % 3]; const dark = tone !== "yellow"; return <article key={t.id} className={`group p-7 transition hover:-translate-y-1 lg:p-9 ${tone === "blue" ? "bg-[#1739D1] text-white" : tone === "purple" ? "bg-[#6B118E] text-white" : "bg-white text-[#1739D1] shadow-sm"}`}>{t.image && <img src={optimize(t.image, 700)} alt="" className="-mx-7 -mt-7 mb-6 h-40 w-[calc(100%+3.5rem)] max-w-none object-cover lg:-mx-9 lg:-mt-9 lg:w-[calc(100%+4.5rem)]" />}<div className={`text-[10px] font-bold uppercase tracking-[.15em] ${dark ? "text-[#FFD21A]" : "text-[#6B118E]"}`}>Formation {t.no}</div><h3 className="mt-16 font-display text-2xl font-bold leading-tight tracking-[-.04em]">{t.title}.</h3><p className={`mt-4 text-sm leading-6 ${dark ? "text-white/65" : "text-[#1739D1]/60"}`}>{t.summary}</p><Link href={`/formations/${t.slug}`} className="mt-8 flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">Voir le programme <ArrowUpRight size={15} /></Link></article>; })}</div></div></section>

        <TrustSlider />
        <Wave color="#F6F3EC" />
        {resources.length > 0 && <section id="ressources" className="border-t border-[#1739D1]/10 bg-[#F6F3EC] py-20 lg:py-28"><div className="mx-auto max-w-[1440px] px-5 lg:px-12"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="eyebrow">{resNo} / Ressources</div><h2 className="mt-6 font-display text-4xl font-bold tracking-[-.06em] sm:text-5xl">Comprendre, décider, <span className="font-serif font-normal italic text-[#6B118E]">agir.</span></h2></div><Link href="/ressources" className="flex w-fit items-center gap-3 border-b-2 border-[#FFD21A] pb-2 text-xs font-bold uppercase tracking-[.12em]">Toutes les ressources <ArrowUpRight size={15} /></Link></div><div className="mt-12 grid gap-6 md:grid-cols-3">{resources.slice(0, 3).map((r) => <Link key={r.id} href={`/ressources/${r.slug}`} className="group block border-t border-[#1739D1]/20 pt-5"><div className="mb-12 text-[10px] font-bold uppercase tracking-[.16em] text-[#6B118E]">{r.category}</div><h3 className="font-display text-2xl font-bold leading-tight tracking-[-.04em]">{r.title}</h3><div className="mt-8 flex items-center gap-2 text-xs font-bold">Lire la ressource <ArrowUpRight size={15} /></div></Link>)}</div></div></section>}

        <section className="bg-[#FFD21A] py-20 lg:py-28"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 px-5 lg:flex-row lg:items-end lg:px-12"><div><div className="eyebrow text-[#6B118E]">{callNo} / Premier échange</div><h2 className="mt-7 max-w-3xl font-display text-5xl font-bold leading-[.9] tracking-[-.07em] text-[#1739D1] sm:text-7xl">Parlons de votre<br /><span className="font-serif font-normal italic">prochain enjeu.</span></h2></div><button onClick={() => setModalOpen(true)} className="flex w-fit items-center gap-4 bg-[#1739D1] px-6 py-4 text-xs font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#1228A0]">Prendre rendez-vous <ArrowUpRight size={17} /></button></div></section>
      </main>

      <footer className="relative overflow-hidden bg-[#1739D1] py-16 text-white lg:py-20"><div className="pointer-events-none absolute -right-10 -top-24 font-display text-[18rem] font-bold leading-none tracking-[-.15em] text-white/[.05]">HQL</div><div className="relative mx-auto max-w-[1440px] px-5 lg:px-12"><div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr_.9fr] lg:gap-20"><div><Logo /><h2 className="mt-12 max-w-xl font-display text-4xl font-bold leading-[.95] tracking-[-.06em] sm:text-6xl">La prochaine bonne décision commence par une <span className="font-serif font-normal italic text-[#FFD21A]">conversation.</span></h2><button onClick={() => setModalOpen(true)} className="mt-8 flex items-center gap-3 bg-[#FFD21A] px-5 py-4 text-xs font-bold uppercase tracking-[.12em] text-[#1739D1] transition hover:bg-white">Parlons de votre projet <ArrowUpRight size={16} /></button></div><div className="lg:pt-16"><div className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[#FFD21A]">Nous trouver</div><p className="text-sm leading-7 text-white/70">C/193-194 Scoa Gbeto<br />Steinmetz — Immeuble Octogone<br />04 BP 0823 Cadjehoun — Bénin<br /><br />contact@hqlconsulting.net<br />01 96 38 88 35 · 01 52 67 96 96</p></div><div className="lg:pt-16"><div className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[#FFD21A]">Explorer</div><div className="grid gap-3 text-sm text-white/70"><Link href="/a-propos" className="transition hover:text-white">Le cabinet</Link><button className="text-left transition hover:text-white" onClick={() => scrollTo("expertises")}>Nos métiers</button><button className="text-left transition hover:text-white" onClick={() => scrollTo("catalogue")}>Formations</button><Link href="/ressources" className="transition hover:text-white">Ressources</Link><Link href="/realisations" className="transition hover:text-white">Réalisations</Link><Link href="/contact" className="transition hover:text-white">Contact</Link></div></div></div><div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[.14em] text-white/40 sm:flex-row"><span>© {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés.</span><span className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link><Link href="/confidentialite" className="hover:text-white">Politique de confidentialité</Link></span><Link href="/admin/login" className="hover:text-white">Espace équipe</Link>{DEVELOPER_NAME && <span className="text-[#FFD21A]">Développé par {DEVELOPER_URL ? <a href={DEVELOPER_URL} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">{DEVELOPER_NAME}</a> : DEVELOPER_NAME}</span>}</div></div></footer>
    </div>
  );
}
