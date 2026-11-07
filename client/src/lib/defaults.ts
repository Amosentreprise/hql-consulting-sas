/* Contenu actuel du site, utilisé (1) comme repli tant que Firestore est vide / non configuré,
   (2) comme source du bouton « Importer le contenu actuel » du tableau de bord. */
import type { Collections, CollectionName } from "./types";

type Seed<K extends CollectionName> = Omit<Collections[K], "createdAt" | "updatedAt">;

const services: Seed<"services">[] = [
  {
    id: "service-01", slug: "01", no: "01", order: 1, published: true, isTraining: false,
    title: "Études et conseil",
    tag: "Stratégie · Financement",
    text: "Structurer vos activités, clarifier vos choix stratégiques et accompagner la mise en œuvre de vos projets.",
    intro: "Structurer vos activités, clarifier vos choix stratégiques et accompagner la mise en œuvre de vos projets.",
    promise: "Une lecture stratégique qui relie vos enjeux, vos ressources et vos prochaines décisions.",
    points: [
      "Conseil en management et stratégie d’entreprise",
      "Structuration des activités et études de faisabilité",
      "Business plan et diagnostic financier",
      "Recherche et mobilisation de financements",
      "Accompagnement des PME, ONG, associations et institutions",
    ],
    audience: "Entreprises · ONG · Associations · Institutions",
    result: "Une trajectoire plus lisible, des priorités mieux définies et des décisions directement actionnables.",
  },
  {
    id: "service-02", slug: "02", no: "02", order: 2, published: true, isTraining: false,
    title: "Audit et contrôle",
    tag: "Risque · Maîtrise",
    text: "Évaluer vos dispositifs, renforcer vos procédures et sécuriser vos opérations avec une lecture indépendante.",
    intro: "Évaluer vos dispositifs, renforcer vos procédures et sécuriser vos opérations avec une lecture indépendante.",
    promise: "Un audit utile ne se limite pas au constat : il identifie les risques et facilite la mise en œuvre des améliorations.",
    points: [
      "Audit financier et audit comptable",
      "Évaluation des procédures internes",
      "Cartographie et analyse des risques",
      "Diagnostic des dispositifs de contrôle",
      "Recommandations et plan de mise en œuvre",
    ],
    audience: "Dirigeants · Directions financières · Projets",
    result: "Une meilleure maîtrise des risques, des procédures renforcées et une information plus fiable pour décider.",
  },
  {
    id: "service-03", slug: "03", no: "03", order: 3, published: true, isTraining: false,
    title: "Comptabilité et fiscalité",
    tag: "Gestion · Conformité",
    text: "Fiabiliser vos informations financières et vous accompagner dans vos obligations comptables, fiscales et sociales.",
    intro: "Fiabiliser vos informations financières et vous accompagner dans vos obligations comptables, fiscales et sociales.",
    promise: "Des données structurées et compréhensibles pour mieux piloter vos activités et respecter vos obligations.",
    points: [
      "Tenue, révision et supervision comptable",
      "Établissement des comptes annuels",
      "Déclarations fiscales et sociales",
      "Reporting financier et tableaux de bord de gestion",
      "Diagnostic financier et conseil fiscal",
      "Évaluation et transmission d’entreprise",
    ],
    audience: "PME · Grandes entreprises · ONG · Associations",
    result: "Une information financière fiable, une meilleure visibilité sur vos activités et une gestion plus sécurisée.",
  },
  {
    id: "service-04", slug: "04", no: "04", order: 4, published: true, isTraining: true,
    title: "Formation professionnelle",
    tag: "Transmission · Autonomie",
    text: "Développer les compétences de vos équipes en comptabilité, gestion, fiscalité et SYSCEBNL.",
    intro: "Développer les compétences de vos équipes en comptabilité, gestion, fiscalité et SYSCEBNL.",
    promise: "Des formations pratiques conçues pour renforcer l’autonomie, la maîtrise technique et la qualité des décisions.",
    points: [
      "Comptabilité et gestion financière",
      "Fiscalité et obligations déclaratives",
      "Application du SYSCEBNL",
      "Rôles et responsabilités des leaders associatifs",
      "Préparation et lecture des états financiers",
      "Programmes adaptés aux besoins des équipes",
    ],
    audience: "Équipes · ONG · Associations · Entreprises",
    result: "Des collaborateurs mieux outillés, des pratiques harmonisées et des compétences mobilisables immédiatement.",
  },
];

const trainings: Seed<"trainings">[] = [
  {
    id: "training-01", slug: "01", no: "01", order: 1, published: true, tone: "blue",
    title: "Application du SYSCEBNL",
    summary: "Comprendre et appliquer le référentiel dans les projets, associations, fondations et ONG.",
    intro: "Comprendre et appliquer le référentiel comptable dans les projets, associations, fondations et ONG.",
    duration: "Sur mesure", format: "Présentiel · Cotonou", date: "Sur demande",
    audience: "ONG, associations, fondations, projets de développement et leurs équipes financières.",
    goals: [
      "Comprendre les principes et la structure du référentiel",
      "Appliquer les règles aux opérations courantes",
      "Produire des états financiers conformes",
      "Préparer le reporting destiné aux partenaires",
    ],
  },
  {
    id: "training-02", slug: "02", no: "02", order: 2, published: true, tone: "yellow",
    title: "Rôles et responsabilités des leaders associatifs",
    summary: "Renforcer la compréhension des responsabilités liées à la gestion et au pilotage.",
    intro: "Renforcer la compréhension des responsabilités liées à la gestion et au pilotage de l’organisation.",
    duration: "Sur mesure", format: "Atelier d’équipe", date: "Sur demande",
    audience: "Dirigeants, membres de conseil d’administration et responsables d’associations.",
    goals: [
      "Clarifier les rôles de chaque acteur",
      "Comprendre les responsabilités de gestion",
      "Renforcer la gouvernance et la redevabilité",
      "Mettre en place des pratiques de suivi",
    ],
  },
  {
    id: "training-03", slug: "03", no: "03", order: 3, published: true, tone: "purple",
    title: "Gestion financière et états financiers",
    summary: "Accompagner les équipes dans la préparation, la lecture et l’utilisation de l’information financière.",
    intro: "Accompagner les équipes dans la préparation, la lecture et l’utilisation de l’information financière.",
    duration: "Sur mesure", format: "Présentiel ou distanciel", date: "Sur demande",
    audience: "Responsables administratifs et financiers, comptables, managers et porteurs de projets.",
    goals: [
      "Organiser la préparation de l’information financière",
      "Lire et interpréter les états financiers",
      "Utiliser les indicateurs pour piloter",
      "Dialoguer avec les partenaires et auditeurs",
    ],
  },
];

const projects: Seed<"projects">[] = [];

const resources: Seed<"resources">[] = [
  { id: "resource-01", slug: "5-questions-financer-sa-croissance", order: 1, published: true, category: "Conseil", readTime: "06 min", accent: "blue", title: "Les 5 questions à se poser avant de financer sa croissance.", excerpt: "Un cadre simple pour passer de l’envie de grandir à une trajectoire financière crédible.", content: "" },
  { id: "resource-02", slug: "projet-impact-finance", order: 2, published: true, category: "Finance verte", readTime: "08 min", accent: "purple", title: "Passer de l’intention à un projet d’impact finançable.", excerpt: "Les premiers repères pour structurer une ambition durable et la rendre lisible pour les financeurs.", content: "" },
  { id: "resource-03", slug: "hql-renforce-accompagnement-pme", order: 3, published: true, category: "Actualité HQL", readTime: "03 min", accent: "yellow", title: "HQL Consulting renforce son accompagnement des PME.", excerpt: "Une proximité renforcée avec les dirigeants qui veulent mieux piloter leurs décisions.", content: "" },
  { id: "resource-04", slug: "lire-ses-chiffres", order: 4, published: true, category: "Comptabilité", readTime: "05 min", accent: "blue", title: "Lire ses chiffres sans être expert-comptable.", excerpt: "Les indicateurs essentiels pour comprendre ce que vos comptes vous disent vraiment.", content: "" },
  { id: "resource-05", slug: "competence-avantage-strategique", order: 5, published: true, category: "Formation", readTime: "04 min", accent: "purple", title: "Pourquoi la compétence devient un avantage stratégique.", excerpt: "Former les équipes, c’est rendre l’organisation plus autonome face à la complexité.", content: "" },
  { id: "resource-06", slug: "budget-qui-raconte-votre-projet", order: 6, published: true, category: "ONG & associations", readTime: "07 min", accent: "yellow", title: "Structurer un budget qui raconte votre projet.", excerpt: "Une méthode pour relier ambition, ressources, calendrier et impact attendu.", content: "" },
];

const team: Seed<"team">[] = [
  { id: "team-01", order: 1, published: true, name: "Nickita Prisca AINA KPADJOUDA", role: "Directrice de mission · Formatrice", detail: "BAC+5 · Plus de 14 ans d’expérience" },
  { id: "team-02", order: 2, published: true, name: "Armel AGBOHOUTO", role: "Consultant · Formateur", detail: "BAC+5 · Plus de 10 ans d’expérience" },
  { id: "team-03", order: 3, published: true, name: "Eric VOKA", role: "Chef de mission · Auditeur comptable · Formateur", detail: "BAC+3 · Plus de 5 ans d’expérience" },
  { id: "team-04", order: 4, published: true, name: "HOUNGBEDJI Bérékia", role: "Auditeur assistant confirmé · Collaborateur", detail: "Assistance aux missions, revue des procédures et rédaction des rapports" },
];

const partners: Seed<"partners">[] = [];

export const defaults: { [K in CollectionName]: Seed<K>[] } = {
  services,
  trainings,
  projects,
  resources,
  team,
  partners,
};
