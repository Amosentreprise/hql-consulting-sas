import { useEffect } from "react";
import { useLocation } from "wouter";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_URL = "https://hqlconsulting.net";
const DEFAULT_IMAGE = "/images/hql-og-image.png";
const defaultKeywords = "HQL Consulting, conseil Bénin, audit Cotonou, comptabilité, fiscalité, SYSCEBNL, formation professionnelle, finance verte, financement de projets";

const routeSEO: Record<string, { title: string; description: string; keywords?: string }> = {
  "/": {
    title: "HQL Consulting — Conseil, audit et formation professionnelle",
    description: "HQL Consulting accompagne les entreprises, ONG, associations et institutions en conseil, audit, comptabilité, fiscalité, financement et formation professionnelle.",
    keywords: defaultKeywords,
  },
  "/a-propos": {
    title: "À propos de HQL Consulting — Une expertise pluridisciplinaire",
    description: "Découvrez HQL Consulting, son approche, ses valeurs, ses domaines d’intervention et son équipe de consultants, auditeurs et formateurs.",
    keywords: "à propos HQL Consulting, cabinet conseil Bénin, équipe audit comptabilité, expertise pluridisciplinaire",
  },
  "/ressources": {
    title: "Ressources HQL Consulting — Conseil, audit, gestion et formation",
    description: "Retrouvez les analyses, repères et conseils HQL Consulting sur le financement, l’audit, la comptabilité, la gestion, la formation et les ONG.",
    keywords: "ressources conseil Bénin, conseils comptabilité, audit contrôle interne, finance verte, SYSCEBNL",
  },
  "/contact": {
    title: "Contact HQL Consulting — Parlons de votre enjeu",
    description: "Contactez HQL Consulting pour un accompagnement en conseil, audit, comptabilité, fiscalité, financement ou formation professionnelle.",
    keywords: "contact HQL Consulting, cabinet conseil Cotonou, audit Bénin, formation SYSCEBNL",
  },
  "/realisations": {
    title: "Réalisations HQL Consulting — Études de cas et accompagnements",
    description: "Découvrez les types de missions et d’accompagnements réalisés par HQL Consulting auprès des entreprises, ONG, associations et institutions.",
    keywords: "réalisations HQL Consulting, études de cas conseil, audit ONG Bénin, accompagnement PME",
  },
};

const services: Record<string, string> = {
  "01": "Études et conseil",
  "02": "Audit et contrôle",
  "03": "Comptabilité et fiscalité",
  "04": "Formation professionnelle",
};

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>("link[rel=canonical]");
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

export default function SEO({ title, description, path, keywords, image = DEFAULT_IMAGE, type = "website", jsonLd }: SEOProps) {
  const [location] = useLocation();
  const cleanPath = path || location.split("?")[0] || "/";
  const serviceSlug = cleanPath.match(/^\/services\/([^/]+)/)?.[1];
  const trainingSlug = cleanPath.match(/^\/formations\/([^/]+)/)?.[1];
  const routeData = routeSEO[cleanPath];
  const resolved = serviceSlug
    ? { title: `${services[serviceSlug] || "Service"} — HQL Consulting`, description: `Découvrez l’accompagnement HQL Consulting en ${services[serviceSlug]?.toLowerCase() || "conseil"} : méthode, prestations et résultats attendus.`, keywords: `${services[serviceSlug] || "service"}, HQL Consulting, conseil Bénin` }
    : trainingSlug
      ? { title: `Formation professionnelle ${trainingSlug} — HQL Consulting`, description: "Développez les compétences de vos équipes avec les formations HQL Consulting en comptabilité, gestion, fiscalité et SYSCEBNL.", keywords: "formation professionnelle Bénin, formation SYSCEBNL, formation comptabilité gestion" }
      : routeData || routeSEO["/"];
  const resolvedTitle = title || resolved.title;
  const resolvedDescription = description || resolved.description;
  const resolvedKeywords = keywords || resolved.keywords || defaultKeywords;
  const resolvedPath = path || cleanPath;

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${resolvedPath === "/" ? "/" : resolvedPath}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
    document.documentElement.lang = "fr";
    document.title = resolvedTitle;
    setMeta("name", "description", resolvedDescription);
    setMeta("name", "keywords", resolvedKeywords);
    setMeta("name", "robots", cleanPath.startsWith("/admin") ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", "HQL Consulting");
    setMeta("property", "og:locale", "fr_FR");
    setMeta("property", "og:title", resolvedTitle);
    setMeta("property", "og:description", resolvedDescription);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:alt", "HQL Consulting — Conseil, audit et formation");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", resolvedTitle);
    setMeta("name", "twitter:description", resolvedDescription);
    setMeta("name", "twitter:image", imageUrl);
    setCanonical(canonicalUrl);

    const oldSchema = document.head.querySelector("script[data-hql-seo-schema]");
    oldSchema?.remove();
    const organization = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "HQL Consulting",
      legalName: "HIGH QUALITY LEVEL CONSULTING",
      url: SITE_URL,
      logo: `${SITE_URL}/images/hql-official-logo_81614e28.png`,
      email: "contact@hqlconsulting.net",
      telephone: "+2290196388835",
      address: { "@type": "PostalAddress", streetAddress: "C/193-194 Scoa Gbeto, Steinmetz — Immeuble Octogone", postalCode: "04 BP 0823", addressLocality: "Cadjehoun", addressCountry: "BJ" },
      areaServed: "BJ",
      serviceType: ["Conseil", "Audit", "Comptabilité", "Fiscalité", "Formation professionnelle", "Finance verte"],
    };
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.hqlSeoSchema = "true";
    schema.textContent = JSON.stringify(jsonLd || organization);
    document.head.appendChild(schema);
  }, [resolvedTitle, resolvedDescription, resolvedKeywords, resolvedPath, image, type, jsonLd]);

  return null;
}

export { SITE_URL };
