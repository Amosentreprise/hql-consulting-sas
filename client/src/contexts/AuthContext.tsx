/* Authentification admin : Firebase Auth + rôle lu dans Firestore (admins/{uid}). */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import type { StaffRole } from "@/lib/types";

type AuthValue = {
  user: User | null;
  role: StaffRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function friendlyAuthError(error: unknown) {
  const code = (error as { code?: string })?.code ?? "";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) return "Email ou mot de passe incorrect.";
  if (code.includes("too-many-requests")) return "Trop de tentatives. Réessayez dans quelques minutes.";
  if (code.includes("network")) return "Problème de connexion réseau.";
  if (code.includes("invalid-email")) return "Adresse email invalide.";
  return "Connexion impossible. Vérifiez vos informations.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<StaffRole | null>(null);
  const [loading, setLoading] = useState(Boolean(auth));

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, async (next) => {
      setUser(next);
      if (next && db) {
        try {
          const snap = await getDoc(doc(db, "admins", next.uid));
          setRole(snap.exists() ? ((snap.data().role as StaffRole) ?? "editor") : null);
        } catch {
          setRole(null);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
  }, []);

  const value: AuthValue = {
    user, role, loading,
    login: async (email, password) => {
      if (!auth) throw new Error("Firebase n'est pas configuré.");
      await signInWithEmailAndPassword(auth, email, password);
    },
    logout: async () => { if (auth) await signOut(auth); },
    resetPassword: async (email) => {
      if (!auth) throw new Error("Firebase n'est pas configuré.");
      await sendPasswordResetEmail(auth, email);
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}
