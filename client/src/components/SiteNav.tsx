import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

type SiteNavProps = {
  overlay?: boolean;
};

export default function SiteNav({ overlay = false }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goToSection = (id: string) => {
    closeMenu();

    if (window.location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${id}`);
      }
      return;
    }

    window.location.href = `/#${id}`;
  };

  return (
    <header
      className={`site-nav z-50 text-white ${
        overlay
          ? "absolute left-0 right-0 top-0 bg-transparent"
          : "relative bg-[#1739D1]"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-12 lg:py-5">
        <Link
          href="/"
          onClick={closeMenu}
          className="relative z-[60] flex items-center bg-white px-2 py-1"
          aria-label="HQL Consulting — Accueil"
        >
          <img
            src="/images/hql-official-logo_81614e28.png"
            alt="HQL Consulting"
            className="h-14 w-[52px] object-contain"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.16em] lg:flex"
          aria-label="Navigation principale"
        >
          <button type="button" onClick={() => goToSection("expertises")} className="nav-link">
            Expertises
          </button>
          <Link href="/a-propos" className="nav-link">
            Le cabinet
          </Link>
          <button type="button" onClick={() => goToSection("formations")} className="nav-link">
            Formations
          </button>
          <Link href="/ressources" className="nav-link">
            Ressources
          </Link>
          <Link href="/realisations" className="nav-link">
            Réalisations
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href="tel:+2290196388835" className="flex items-center gap-2 text-[11px] font-bold">
            <Phone size={14} className="text-[#FFD21A]" />
            +229 01 96 38 88 35
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-3 bg-[#FFD21A] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#1739D1] transition duration-300 hover:bg-white"
          >
            Prendre rendez-vous
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          className={`mobile-menu-button relative z-[60] lg:hidden ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="mobile-menu-icon">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-navigation-shell lg:hidden ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          className="mobile-navigation-overlay"
          onClick={closeMenu}
        />

        <aside className="mobile-navigation-drawer">
          <div className="mobile-navigation-topline">
            <span>HQL / Navigation</span>
            <span className="text-[#FFD21A]">Menu</span>
          </div>

          <nav className="mobile-navigation-links" aria-label="Navigation mobile">
            <button type="button" onClick={() => goToSection("expertises")} className="mobile-navigation-link text-left">
              <span className="mobile-navigation-number">01</span>
              <span>Expertises</span>
            </button>
            <Link href="/a-propos" onClick={closeMenu} className="mobile-navigation-link">
              <span className="mobile-navigation-number">02</span>
              <span>Le cabinet</span>
            </Link>
            <button type="button" onClick={() => goToSection("formations")} className="mobile-navigation-link text-left">
              <span className="mobile-navigation-number">03</span>
              <span>Formations</span>
            </button>
            <Link href="/ressources" onClick={closeMenu} className="mobile-navigation-link">
              <span className="mobile-navigation-number">04</span>
              <span>Ressources</span>
            </Link>
            <Link href="/realisations" onClick={closeMenu} className="mobile-navigation-link">
              <span className="mobile-navigation-number">05</span>
              <span>Réalisations</span>
            </Link>
            <Link href="/contact" onClick={closeMenu} className="mobile-navigation-link">
              <span className="mobile-navigation-number">06</span>
              <span>Contact</span>
            </Link>
          </nav>

          <div className="mobile-navigation-footer">
            <a href="tel:+2290196388835" onClick={closeMenu} className="mobile-navigation-phone">
              <Phone size={16} />
              +229 01 96 38 88 35
            </a>
            <Link href="/contact" onClick={closeMenu} className="mobile-navigation-cta">
              Prendre rendez-vous
              <ArrowUpRight size={17} />
            </Link>
            <p className="mobile-navigation-caption">
              Conseil · Audit · Finance verte · Formation
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
}
