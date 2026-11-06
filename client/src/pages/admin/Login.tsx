import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { friendlyAuthError, useAuth } from "@/contexts/AuthContext";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function Login() {
  const { login, resetPassword, user, role, loading } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { if (!loading && user && role) navigate("/admin"); }, [loading, user, role, navigate]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true); setError("");
    try { await login(email, password); navigate("/admin"); }
    catch (e) { setError(friendlyAuthError(e)); }
    setBusy(false);
  };

  const forgot = async () => {
    if (!email) { setError("Saisissez d'abord votre email."); return; }
    try { await resetPassword(email); toast.success("Email de réinitialisation envoyé."); } catch (e) { setError(friendlyAuthError(e)); }
  };

  return (
    <div className="grid min-h-screen bg-[#1739D1] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden p-12 text-white lg:block">
        <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="absolute -right-10 -top-10 h-[320px] w-[320px] rounded-full border border-[#FFD21A]/25" />
        <img src="/images/hql-official-logo_81614e28.png" alt="HQL Consulting" className="relative h-16 bg-white p-1" />
        <h1 className="relative mt-24 max-w-md font-display text-6xl font-bold leading-[.92] tracking-[-.07em]">Espace <span className="font-serif font-normal italic text-[#FFD21A]">équipe.</span></h1>
        <p className="relative mt-6 max-w-sm text-sm leading-7 text-white/70">Gérez les réalisations, ressources, formations et messages du site HQL Consulting.</p>
      </div>
      <div className="flex items-center justify-center bg-[#F6F3EC] p-6">
        <form onSubmit={submit} className="w-full max-w-sm text-[#1739D1]">
          <div className="eyebrow">Connexion</div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-[-.05em]">Se connecter</h2>
          {!isFirebaseConfigured && <p className="mt-5 bg-red-50 p-3 text-xs text-red-800">Firebase n'est pas configuré (variables VITE_FIREBASE_* manquantes).</p>}
          <div className="mt-8 grid gap-5">
            <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">Email
              <input type="email" required autoComplete="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">Mot de passe
              <input type="password" required autoComplete="current-password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button disabled={busy || !isFirebaseConfigured} className="flex items-center justify-center gap-3 bg-[#FFD21A] px-5 py-4 text-xs font-bold uppercase tracking-[.13em] transition hover:bg-[#1739D1] hover:text-white disabled:opacity-50">
              {busy ? <Loader2 size={16} className="animate-spin" /> : <>Entrer <ArrowUpRight size={16} /></>}
            </button>
            <button type="button" onClick={forgot} className="w-fit text-xs underline underline-offset-4">Mot de passe oublié ?</button>
          </div>
          <Link href="/" className="mt-12 block text-[10px] font-bold uppercase tracking-[.14em] opacity-60">← Retour au site</Link>
        </form>
      </div>
    </div>
  );
}
