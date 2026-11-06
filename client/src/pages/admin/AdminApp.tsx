/* Coquille de l'espace /admin : garde d'accès + navigation latérale. */
import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { Copy, ExternalLink, Handshake, Image as LayoutDashboard, Loader2, LogOut, Mail, Menu, Newspaper, Users as UsersIcon, UserCog, GraduationCap, Briefcase, FolderKanban, X } from "lucide-react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import CollectionManager from "@/components/admin/CollectionManager";
import { schemas } from "@/components/admin/schemas";
import type { CollectionName } from "@/lib/types";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import UsersPage from "./Users";
import Login from "./Login";

const icons: Record<CollectionName, typeof Newspaper> = {
  projects: FolderKanban, resources: Newspaper, trainings: GraduationCap, services: Briefcase, team: UsersIcon, partners: Handshake,
};

function Shell() {
  const { user, role, loading, logout } = useAuth();
  const [location, navigate] = useLocation();
  const [match, params] = useRoute("/admin/:section");
  const [menu, setMenu] = useState(false);
  const section = match ? params!.section : "";

  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "robots"; document.head.appendChild(meta); }
    meta.content = "noindex, nofollow";
    document.title = "Espace équipe — HQL Consulting";
  }, [location]);

  useEffect(() => { if (!loading && !user) navigate("/admin/login"); }, [loading, user, navigate]);
  useEffect(() => setMenu(false), [location]);

  if (loading || !user) return <div className="flex min-h-screen items-center justify-center bg-[#F6F3EC]"><Loader2 className="animate-spin text-[#1739D1]" /></div>;

  if (!role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F3EC] p-6 text-[#1739D1]">
        <div className="max-w-md bg-white p-8">
          <h1 className="font-display text-3xl font-bold tracking-[-.05em]">Accès non autorisé</h1>
          <p className="mt-4 text-sm leading-7">Votre compte est connecté mais n'a pas encore d'accès à l'espace équipe. Transmettez cet identifiant à un administrateur :</p>
          <div className="mt-4 flex items-center gap-2 bg-[#EEF2F8] p-3 font-mono text-xs break-all">{user.uid}
            <button aria-label="Copier" onClick={() => navigator.clipboard.writeText(user.uid)}><Copy size={14} /></button></div>
          <button onClick={logout} className="mt-6 text-xs font-bold uppercase tracking-[.12em] underline">Se déconnecter</button>
        </div>
      </div>
    );
  }

  const nav = (
    <nav className="grid gap-1 text-sm font-semibold">
      {[
        { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, active: !section },
        { href: "/admin/messages", label: "Messages", icon: Mail, active: section === "messages" },
        ...(Object.keys(schemas) as CollectionName[]).sort((a, b) => ["projects","resources","trainings","services","team","partners"].indexOf(a) - ["projects","resources","trainings","services","team","partners"].indexOf(b)).map((n) => ({ href: `/admin/${n}`, label: schemas[n].label, icon: icons[n], active: section === n })),
        ...(role === "admin" ? [{ href: "/admin/users", label: "Utilisateurs", icon: UserCog, active: section === "users" }] : []),
      ].map(({ href, label, icon: Icon, active }) => (
        <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 transition ${active ? "bg-[#FFD21A] text-[#1739D1]" : "text-white/80 hover:bg-white/10"}`}><Icon size={17} /> {label}</Link>
      ))}
    </nav>
  );

  let page;
  if (!section) page = <Dashboard />;
  else if (section === "messages") page = <Messages />;
  else if (section === "users") page = <UsersPage />;
  else if (section in schemas) page = <CollectionManager key={section} name={section as CollectionName} />;
  else page = <p>Section introuvable.</p>;

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#1739D1] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className={`${menu ? "fixed inset-0 z-50 flex" : "hidden"} flex-col gap-8 bg-[#1739D1] p-5 text-white lg:sticky lg:top-0 lg:flex lg:h-screen`}>
        <div className="flex items-center justify-between">
          <img src="/images/hql-official-logo_81614e28.png" alt="HQL" className="h-12 bg-white p-1" />
          <button className="lg:hidden" onClick={() => setMenu(false)} aria-label="Fermer le menu"><X /></button>
        </div>
        {nav}
        <div className="mt-auto grid gap-3 text-xs">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white"><ExternalLink size={14} /> Voir le site</a>
          <div className="truncate text-white/50">{user.email} · {role === "admin" ? "Administrateur" : "Éditeur"}</div>
          <button onClick={async () => { await logout(); navigate("/admin/login"); }} className="flex items-center gap-2 text-[#FFD21A]"><LogOut size={14} /> Déconnexion</button>
        </div>
      </aside>
      <div>
        <div className="flex items-center justify-between bg-[#1739D1] p-4 text-white lg:hidden">
          <button onClick={() => setMenu(true)} aria-label="Ouvrir le menu"><Menu /></button><span className="font-display font-bold">Espace équipe</span><span className="w-6" />
        </div>
        <main className="mx-auto max-w-5xl px-5 py-10 lg:px-10 lg:py-14">{page}</main>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [isLogin] = useRoute("/admin/login");
  return (
    <AuthProvider>
      {isLogin ? <Login /> : <Shell />}
    </AuthProvider>
  );
}
