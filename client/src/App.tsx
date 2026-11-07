/* HQL Signal stratégique — shell minimal pour laisser l’identité éditoriale de Home porter l’expérience. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import ServiceDetail from "./pages/ServiceDetail";
import TrainingDetail from "./pages/TrainingDetail";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import SEO from "./components/SEO";
import { MentionsLegales, Confidentialite } from "./pages/LegalPage";
import ResourceDetail from "./pages/ResourceDetail";
import ProjectDetail from "./pages/ProjectDetail";

const AdminApp = lazy(() => import("./pages/admin/AdminApp"));
const Admin = () => <Suspense fallback={<div className="min-h-screen bg-[#F6F3EC]" />}><AdminApp /></Suspense>;

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/a-propos" component={About} /><Route path="/services/:slug" component={ServiceDetail} /><Route path="/formations/:slug" component={TrainingDetail} /><Route path="/ressources" component={Resources} /><Route path="/contact" component={Contact} /><Route path="/realisations" component={Projects} /><Route path="/realisations/:slug" component={ProjectDetail} /><Route path="/ressources/:slug" component={ResourceDetail} /><Route path="/mentions-legales" component={MentionsLegales} /><Route path="/confidentialite" component={Confidentialite} /><Route path="/admin" component={Admin} /><Route path="/admin/:section" component={Admin} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><SEO /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
