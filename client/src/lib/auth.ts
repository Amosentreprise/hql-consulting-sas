/* Firebase Auth — importé uniquement par l'espace /admin (bundle séparé).
   initializeAuth sans « popup resolver » : pas d'iframe ni de script Google externe (CSP plus stricte). */
import { browserLocalPersistence, getAuth, indexedDBLocalPersistence, initializeAuth, type Auth } from "firebase/auth";
import { app } from "./firebase";

function create(): Auth | null {
  if (!app) return null;
  try {
    return initializeAuth(app, { persistence: [indexedDBLocalPersistence, browserLocalPersistence] });
  } catch {
    return getAuth(app);
  }
}

export const auth: Auth | null = create();
