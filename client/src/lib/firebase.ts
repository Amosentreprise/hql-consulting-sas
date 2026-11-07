/* Firebase — initialisation unique (Firestore pour les contenus, Auth chargé uniquement dans l'admin). */
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

export const app: FirebaseApp | null = isFirebaseConfigured
  ? (getApps()[0] ?? initializeApp(config))
  : null;

/* App Check (anti-robot) : actif seulement si VITE_RECAPTCHA_SITE_KEY est renseignée. */
const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
if (app && recaptchaKey) {
  if (import.meta.env.DEV) (self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  try {
    initializeAppCheck(app, { provider: new ReCaptchaV3Provider(recaptchaKey), isTokenAutoRefreshEnabled: true });
  } catch { /* déjà initialisé (rechargement à chaud) */ }
}

export const db: Firestore | null = app ? getFirestore(app) : null;
