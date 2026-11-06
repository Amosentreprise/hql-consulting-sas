import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { submitMessage } from "@/lib/content";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const contactDetails = [
  {
    icon: MapPin,
    label: "Adresse",
    content: <>C/193-194 Scoa Gbeto<br />Steinmetz — Immeuble Octogone<br />04 BP 0823 Cadjehoun — Bénin</>,
  },
  {
    icon: Phone,
    label: "Téléphone",
    content: <>01 96 38 88 35<br />01 52 67 96 96</>,
  },
  {
    icon: Mail,
    label: "Email",
    content: <>contact@hqlconsulting.net</>,
  },
];

export default function Contact() {
  const [sending, setSending] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // anti-spam (champ piège)
    setSending(true);
    try {
      const subject = String(data.get("subject") || "");
      await submitMessage({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        subject: subject.startsWith("Choisir") ? "Non précisé" : subject,
        message: String(data.get("message") || ""),
        source: "page-contact",
      });
      form.reset();
      toast.success("Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.");
    } catch (error) {
      toast.error((error as Error).message || "Envoi impossible pour le moment.");
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F3EC] text-[#1739D1]">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[#1739D1] py-24 text-white lg:py-32">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-12 -top-20 h-[340px] w-[340px] rounded-full border border-[#FFD21A]/20" />
          <div className="pointer-events-none absolute bottom-0 right-[12%] h-px w-[32%] bg-white/15" />
          <div className="pointer-events-none absolute right-[12%] top-0 h-full w-px bg-white/10" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(255,210,26,0.10),transparent_24%),linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.04)_48%,transparent_49%)]" />

          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-12">
            <div className="grid min-h-[470px] gap-14 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#FFD21A]"><span className="h-px w-10 bg-[#FFD21A]" /> 01 / Contact</div>
                <p className="mt-12 max-w-xs border-l border-white/30 pl-5 text-sm leading-7 text-white/65">Un premier échange pour comprendre votre enjeu et identifier les prochaines étapes.</p>
              </div>
              <div>
                <h1 className="max-w-5xl font-display text-5xl font-bold leading-[.92] tracking-[-.07em] sm:text-7xl lg:text-8xl">Donnons forme à votre <span className="font-serif font-normal italic text-[#FFD21A]">prochain enjeu.</span></h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">Présentez-nous votre besoin. HQL Consulting vous répond avec une première lecture utile, structurée et adaptée à votre organisation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coordonnées et formulaire */}
        <section className="bg-[#F6F3EC] py-20 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
              <div>
                <div className="eyebrow">02 / Premier échange</div>
                <h2 className="mt-7 max-w-md font-display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-6xl">Parlons de ce qui compte vraiment.</h2>
                <p className="mt-7 max-w-md text-base leading-8 text-[#1739D1]/65">Que votre besoin concerne le conseil, l’audit, la gestion, le financement ou la formation, notre équipe est à votre écoute.</p>

                <div className="mt-12 grid gap-7 border-t border-[#1739D1]/20 pt-8">
                  {contactDetails.map(({ icon: Icon, label, content }) => (
                    <div key={label} className="flex gap-4">
                      <Icon className="mt-1 shrink-0 text-[#6B118E]" size={19} />
                      <div>
                        <div className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#6B118E]">{label}</div>
                        <div className="text-sm leading-7 text-[#1739D1]/70">{content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-7 shadow-[0_20px_70px_rgba(23,57,209,.08)] sm:p-10 lg:p-12">
                <div className="mb-9 flex items-end justify-between gap-6 border-b border-[#1739D1]/15 pb-6">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[.16em] text-[#6B118E]">Votre demande</div>
                    <h3 className="mt-3 font-display text-3xl font-bold tracking-[-.05em]">Échangeons sur votre besoin.</h3>
                  </div>
                  <span className="hidden font-display text-5xl font-bold tracking-[-.08em] text-[#1739D1]/10 sm:block">HQL</span>
                </div>

                <form className="grid gap-6" onSubmit={handleSubmit}>
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">
                      Nom et prénom
                      <input name="name" required className="form-input" placeholder="Votre nom" />
                    </label>
                    <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">
                      Email professionnel
                      <input name="email" required type="email" className="form-input" placeholder="vous@organisation.com" />
                    </label>
                  </div>

                  <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">
                    Votre besoin
                    <select name="subject" className="form-input">
                      <option>Choisir un domaine</option>
                      <option>Études et conseil</option>
                      <option>Audit et contrôle</option>
                      <option>Comptabilité et fiscalité</option>
                      <option>Financement et finance verte</option>
                      <option>Formation professionnelle</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">
                    Votre message
                    <textarea name="message" required rows={6} className="form-input resize-none" placeholder="Présentez-nous votre organisation, votre enjeu et le type d’accompagnement recherché..." />
                  </label>

                  <div className="flex flex-col justify-between gap-5 border-t border-[#1739D1]/15 pt-6 sm:flex-row sm:items-center">
                    <p className="max-w-xs text-xs leading-5 text-[#1739D1]/45">Vos informations sont utilisées uniquement pour répondre à votre demande.</p>
                    <button disabled={sending} className="flex w-fit items-center gap-3 bg-[#FFD21A] px-5 py-4 text-xs font-bold uppercase tracking-[.13em] text-[#1739D1] transition hover:bg-[#6B118E] hover:text-white disabled:opacity-60" type="submit">
                      {sending ? "Envoi…" : "Envoyer ma demande"}
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Bandeau final */}
        <section className="relative overflow-hidden bg-[#E6EBFF] py-16 lg:py-20">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#6B118E]/15" />
          <div className="relative mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 md:flex-row md:items-center lg:px-12">
            <div>
              <div className="eyebrow text-[#6B118E]">03 / Échange direct</div>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-[-.05em] sm:text-4xl">Un besoin précis ? Contactez directement notre équipe.</h2>
            </div>
            <a href="tel:+2290196388835" className="flex w-fit items-center gap-3 border-b-2 border-[#FFD21A] pb-2 text-xs font-bold uppercase tracking-[.13em]">01 96 38 88 35 <Phone size={16} /></a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
