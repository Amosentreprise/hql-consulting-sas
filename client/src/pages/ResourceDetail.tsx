import { ArrowLeft, Clock3 } from "lucide-react";
import { Link, useRoute } from "wouter";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { useItem } from "@/lib/content";
import { optimize } from "@/lib/cloudinary";
import { Markdown } from "@/lib/markdown";

export default function ResourceDetail() {
  const [, params] = useRoute("/ressources/:slug");
  const { item, loading } = useItem("resources", params?.slug);

  if (loading) return <div className="min-h-screen bg-[#F6F3EC]"><SiteNav /></div>;
  if (!item) return <NotFound />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F3EC] text-[#1739D1]">
      <SEO title={`${item.title} — HQL Consulting`} description={item.excerpt} type="article" image={item.image ? optimize(item.image, 1200) : undefined} />
      <SiteNav />
      <main>
        <section className="bg-[#1739D1] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-4xl px-5 lg:px-12">
            <Link href="/ressources" className="flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#FFD21A]"><ArrowLeft size={14} /> Toutes les ressources</Link>
            <div className="mt-12 flex items-center gap-5 text-[10px] font-bold uppercase tracking-[.16em] text-[#FFD21A]">
              <span>{item.category}</span><span className="flex items-center gap-1 text-white/60"><Clock3 size={12} /> {item.readTime}</span>
              {item.publishedAt && <span className="text-white/60">{item.publishedAt}</span>}
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-6xl">{item.title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">{item.excerpt}</p>
          </div>
        </section>
        <article className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
          {item.image && <img src={optimize(item.image, 1400)} alt="" className="mb-14 w-full object-cover" />}
          {item.content?.trim() ? <Markdown source={item.content} /> : <p className="border-l-2 border-[#FFD21A] pl-6 text-lg">Cet article est en cours de rédaction. Revenez bientôt ou <Link href="/contact" className="font-bold underline">contactez-nous</Link> pour échanger sur le sujet.</p>}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
