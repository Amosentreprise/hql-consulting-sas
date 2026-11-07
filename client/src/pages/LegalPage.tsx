import type { ReactNode } from "react";
import { Link } from "wouter";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_LEGAL_NAME, COMPANY_NAME, DATA_RETENTION, LEGAL, LEGAL_UPDATED } from "@/lib/site";

function Page({ title, intro, path, children }: { title: string; intro: string; path: string; children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F3EC] text-[#1739D1]">
      <SEO title={`${title} — ${COMPANY_NAME}`} description={intro} path={path} />
      <SiteNav />
      <main>
        <section className="bg-[#1739D1] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-4xl px-5 lg:px-12">
            <div className="eyebrow text-[#FFD21A]">Informations légales</div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-6xl">{title}</h1>
            <p className="mt-6 text-sm text-white/60">Dernière mise à jour : {LEGAL_UPDATED}</p>
          </div>
        </section>
        <article className="mx-auto max-w-3xl space-y-12 px-5 py-16 text-base leading-8 text-[#1739D1]/85 lg:py-24">{children}</article>
      </main>
      <SiteFooter />
    </div>
  );
}

const H = ({ children }: { children: ReactNode }) => <h2 className="mb-4 font-display text-2xl font-bold tracking-[-.04em] text-[#1739D1]">{children}</h2>;
const Mail = () => <a href={`mailto:${COMPANY_EMAIL}`} className="font-semibold underline decoration-[#FFD21A] decoration-2 underline-offset-4">{COMPANY_EMAIL}</a>;

export function MentionsLegales() {
  return (
    <Page title="Mentions légales" path="/mentions-legales" intro={`Mentions légales du site ${COMPANY_NAME} : éditeur, hébergeur, propriété intellectuelle.`}>
      <section>
        <H>Éditeur du site</H>
        <p>{COMPANY_LEGAL_NAME}<br />{COMPANY_ADDRESS}<br />Email : <Mail />
          {LEGAL.rccm && <><br />RCCM : {LEGAL.rccm}</>}
          {LEGAL.ifu && <><br />IFU : {LEGAL.ifu}</>}
          {LEGAL.capital && <><br />Capital social : {LEGAL.capital}</>}
          {LEGAL.publicationDirector && <><br />Directeur de la publication : {LEGAL.publicationDirector}</>}
        </p>
      </section>
      <section>
        <H>Hébergement</H>
        <p>Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Les données du formulaire de contact sont stockées chez Google Cloud (Firebase).</p>
      </section>
      <section>
        <H>Propriété intellectuelle</H>
        <p>L’ensemble des contenus du site (textes, logos, images, mise en page) est la propriété de {COMPANY_NAME} ou de ses partenaires. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.</p>
      </section>
      <section>
        <H>Responsabilité</H>
        <p>Les informations publiées ont une vocation générale et ne remplacent pas un conseil personnalisé. {COMPANY_NAME} s’efforce de les maintenir exactes et à jour, sans garantie d’exhaustivité. Les liens vers des sites tiers n’engagent pas sa responsabilité.</p>
      </section>
      <section>
        <H>Données personnelles</H>
        <p>Le traitement de vos données est détaillé dans notre <Link href="/confidentialite" className="font-semibold underline decoration-[#FFD21A] decoration-2 underline-offset-4">politique de confidentialité</Link>.</p>
      </section>
      <section>
        <H>Droit applicable</H>
        <p>Le site est soumis au droit béninois. En cas de litige, les tribunaux compétents de Cotonou seront saisis, sous réserve des règles impératives applicables.</p>
      </section>
    </Page>
  );
}

export function Confidentialite() {
  return (
    <Page title="Politique de confidentialité" path="/confidentialite" intro={`Comment ${COMPANY_NAME} collecte, utilise et protège vos données personnelles.`}>
      <section>
        <H>Responsable du traitement</H>
        <p>{COMPANY_LEGAL_NAME}, {COMPANY_ADDRESS}. Contact : <Mail />.</p>
      </section>
      <section>
        <H>Données collectées</H>
        <p>Lorsque vous utilisez le formulaire de contact ou de prise de rendez-vous, nous collectons : votre nom, votre adresse email, le domaine concerné et le message que vous rédigez. Le site n’utilise ni cookie publicitaire ni outil de suivi des visites.</p>
      </section>
      <section>
        <H>Finalités et base légale</H>
        <p>Ces données servent uniquement à répondre à votre demande et à vous proposer un échange. Elles sont traitées sur la base de votre consentement, que vous donnez en envoyant le formulaire.</p>
      </section>
      <section>
        <H>Durée de conservation</H>
        <p>Vos messages sont conservés le temps nécessaire au traitement de votre demande, puis au maximum {DATA_RETENTION}, sauf obligation légale ou relation contractuelle en cours.</p>
      </section>
      <section>
        <H>Destinataires et sous-traitants</H>
        <p>Vos données ne sont ni vendues ni cédées. Elles sont accessibles à l’équipe de {COMPANY_NAME} et hébergées par nos prestataires techniques : Google (Firebase, stockage des messages), Vercel (hébergement du site) et Cloudinary (diffusion des images). Ces prestataires peuvent traiter des données en dehors du Bénin, avec des garanties contractuelles appropriées. Les polices de caractères du site sont chargées depuis Google Fonts, ce qui transmet votre adresse IP à Google.</p>
      </section>
      <section>
        <H>Vos droits</H>
        <p>Vous pouvez demander l’accès, la rectification, l’opposition ou la suppression de vos données en écrivant à <Mail />. Nous répondons dans un délai raisonnable. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l’Autorité de protection des données personnelles (APDP) du Bénin.</p>
      </section>
      <section>
        <H>Sécurité</H>
        <p>La connexion au site est chiffrée (HTTPS). L’accès aux messages est réservé aux membres autorisés de l’équipe et protégé par authentification.</p>
      </section>
      <section>
        <H>Mise à jour</H>
        <p>Cette politique peut évoluer ; la date de dernière mise à jour figure en haut de cette page.</p>
      </section>
    </Page>
  );
}
