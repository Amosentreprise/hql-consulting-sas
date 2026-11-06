import type { CollectionName } from "@/lib/types";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "textarea" | "markdown" | "select" | "tags" | "lines" | "image" | "switch";
  options?: { value: string; label: string }[];
  hint?: string;
  placeholder?: string;
  required?: boolean;
};

export type Schema = {
  name: CollectionName;
  label: string;
  singular: string;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  hasSlug?: boolean;
  folder: string;
  fields: FieldDef[];
  newDefaults: Record<string, unknown>;
};

const tone = [
  { value: "blue", label: "Bleu royal" },
  { value: "purple", label: "Violet" },
  { value: "yellow", label: "Jaune" },
];

export const schemas: Record<CollectionName, Schema> = {
  projects: {
    name: "projects", label: "Réalisations", singular: "réalisation", titleField: "title", subtitleField: "sector",
    imageField: "image", hasSlug: true, folder: "hql/realisations",
    newDefaults: { published: true, tone: "blue", tags: [] },
    fields: [
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "sector", label: "Secteur / catégorie", type: "text", placeholder: "PME · Pilotage", required: true },
      { name: "text", label: "Résumé (carte)", type: "textarea", required: true },
      { name: "tags", label: "Étiquettes", type: "tags", hint: "Tapez puis Entrée pour ajouter." },
      { name: "tone", label: "Couleur de la carte", type: "select", options: tone },
      { name: "image", label: "Image de couverture", type: "image" },
      { name: "client", label: "Client / bénéficiaire (optionnel)", type: "text" },
      { name: "challenge", label: "Contexte et enjeu", type: "markdown" },
      { name: "approach", label: "Démarche HQL", type: "markdown" },
      { name: "results", label: "Résultats", type: "markdown" },
      { name: "published", label: "Publié sur le site", type: "switch" },
    ],
  },
  resources: {
    name: "resources", label: "Ressources", singular: "ressource", titleField: "title", subtitleField: "category",
    imageField: "image", hasSlug: true, folder: "hql/ressources",
    newDefaults: { published: true, accent: "blue", readTime: "05 min" },
    fields: [
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "category", label: "Catégorie", type: "text", placeholder: "Conseil, Finance verte, Formation…", required: true },
      { name: "readTime", label: "Temps de lecture", type: "text", placeholder: "05 min" },
      { name: "publishedAt", label: "Date de publication", type: "text", placeholder: "2026-11-06" },
      { name: "excerpt", label: "Introduction courte", type: "textarea", required: true },
      { name: "content", label: "Contenu de l'article", type: "markdown", hint: "## Titre · **gras** · *italique* · - liste · [lien](https://…)" },
      { name: "accent", label: "Couleur d'accent", type: "select", options: tone },
      { name: "image", label: "Image", type: "image" },
      { name: "published", label: "Publié sur le site", type: "switch" },
    ],
  },
  trainings: {
    name: "trainings", label: "Formations", singular: "formation", titleField: "title", subtitleField: "duration",
    imageField: "image", hasSlug: true, folder: "hql/formations",
    newDefaults: { published: true, tone: "blue", goals: [], format: "Présentiel · Cotonou", date: "Sur demande", duration: "Sur mesure" },
    fields: [
      { name: "no", label: "Numéro", type: "text", placeholder: "04", required: true },
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "summary", label: "Résumé (catalogue)", type: "textarea", required: true },
      { name: "intro", label: "Introduction (page détail)", type: "textarea" },
      { name: "duration", label: "Durée", type: "text" },
      { name: "format", label: "Format / lieu", type: "text" },
      { name: "date", label: "Prochaine session", type: "text" },
      { name: "audience", label: "Public cible", type: "textarea" },
      { name: "goals", label: "Objectifs", type: "lines", hint: "Un objectif par ligne." },
      { name: "tone", label: "Couleur de la carte", type: "select", options: tone },
      { name: "image", label: "Image", type: "image" },
      { name: "published", label: "Publié sur le site", type: "switch" },
    ],
  },
  services: {
    name: "services", label: "Expertises", singular: "expertise", titleField: "title", subtitleField: "tag",
    imageField: "image", hasSlug: true, folder: "hql/expertises",
    newDefaults: { published: true, points: [], isTraining: false },
    fields: [
      { name: "no", label: "Numéro", type: "text", placeholder: "05", required: true },
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "tag", label: "Mots-clés (carte)", type: "text", placeholder: "Stratégie · Financement" },
      { name: "text", label: "Résumé (carte)", type: "textarea", required: true },
      { name: "intro", label: "Introduction (page détail)", type: "textarea" },
      { name: "promise", label: "Promesse", type: "textarea" },
      { name: "points", label: "Prestations", type: "lines", hint: "Une prestation par ligne." },
      { name: "audience", label: "Public concerné", type: "text" },
      { name: "result", label: "Résultat attendu", type: "textarea" },
      { name: "isTraining", label: "Renvoie vers le catalogue de formations", type: "switch" },
      { name: "image", label: "Image", type: "image" },
      { name: "published", label: "Publié sur le site", type: "switch" },
    ],
  },
  team: {
    name: "team", label: "Équipe", singular: "membre", titleField: "name", subtitleField: "role",
    imageField: "photo", folder: "hql/equipe",
    newDefaults: { published: true },
    fields: [
      { name: "name", label: "Nom complet", type: "text", required: true },
      { name: "role", label: "Fonction", type: "text", required: true },
      { name: "detail", label: "Diplôme / expérience", type: "text" },
      { name: "photo", label: "Portrait", type: "image", hint: "Format portrait (4:5) recommandé." },
      { name: "published", label: "Affiché sur le site", type: "switch" },
    ],
  },
  partners: {
    name: "partners", label: "Partenaires", singular: "partenaire", titleField: "name", subtitleField: "category",
    imageField: "logo", folder: "hql/partenaires",
    newDefaults: { published: true },
    fields: [
      { name: "name", label: "Nom", type: "text", required: true },
      { name: "category", label: "Type", type: "text", placeholder: "ONG, Institution, Entreprise…" },
      { name: "logo", label: "Logo", type: "image", hint: "PNG ou SVG sur fond transparent de préférence." },
      { name: "url", label: "Site web (optionnel)", type: "text", placeholder: "https://…" },
      { name: "published", label: "Affiché sur le site", type: "switch" },
    ],
  },
};

export const collectionOrder: CollectionName[] = ["projects", "resources", "trainings", "services", "team", "partners"];
