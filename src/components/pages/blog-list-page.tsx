import Image from "next/image";
import Link from "next/link";

import { WaveDivider } from "@/components/ui/wave-divider";

type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  featured?: boolean;
  image: string;
};

const posts: BlogPost[] = [
  {
    title: "B2B Cold Outreach Ultimate Training 2023",
    excerpt: "Prospection commerciale B2B: comment prospecter via LinkedIn et email en 2023.",
    category: "Prospection",
    featured: true,
    image: "/images/blog/cold-outreach.png",
  },
  {
    title: "Prospecter 20k entreprises facilement",
    excerpt: "Ciblage en masse et qualification rapide pour des campagnes outbound precises.",
    category: "Strategie",
    featured: true,
    image: "/images/blog/getty.png",
  },
  {
    title: "Pourquoi le developpement de votre sequence email est la clef",
    excerpt: "Structure, angle, preuve sociale et call to action adapte a la cible.",
    category: "Emailing",
    image: "/images/blog/screenshot-2021.png",
  },
  {
    title: "3 erreurs dans les introductions de campagne",
    excerpt: "Ce qui bloque les reponses et comment corriger rapidement vos messages.",
    category: "Copywriting",
    image: "/images/blog/dominos.png",
  },
  {
    title: "Automatiser votre qualification initiale",
    excerpt: "Un framework simple pour trier les leads avant handover commercial.",
    category: "Operations",
    image: "/images/blog/fishing.jpeg",
  },
  {
    title: "Prospection B2B: 8 questions avant de scaler",
    excerpt: "Checklist pour stabiliser un moteur d'acquisition durable.",
    category: "Methodologie",
    image: "/images/blog/spearfishing.jpg",
  },
  {
    title: "Quel est l'indicateur principal a suivre ?",
    excerpt: "Taux de rendez-vous qualifies, vitesse de boucle et ratio compte actif.",
    category: "KPI",
    image: "/images/blog/kpi.png",
  },
  {
    title: "Ce que 2023 nous a appris en sales",
    excerpt: "Lecons operationnelles sur le timing, le canal et les objections recurrentes.",
    category: "Retour terrain",
    image: "/images/blog/mike-pregler.png",
  },
  {
    title: "Predictions prospection pour 2027",
    excerpt: "Comment l'IA et la personnalisation transforment les interactions outbound.",
    category: "Tendance",
    image: "/images/blog/team.png",
  },
];

function PostCard({ post }: { post: BlogPost }) {
  const isFeatured = Boolean(post.featured);

  return (
    <article className="rounded-lg border border-stroke bg-white p-4 shadow-soft">
      <div className={`overflow-hidden rounded-md border ${isFeatured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image
          src={post.image}
          alt={post.title}
          width={1080}
          height={675}
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="mt-4 text-lg font-semibold leading-6 text-devlo-900">{post.title}</h2>
      <p className="mt-2 text-sm leading-6 text-devlo-700/80">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.13em] text-devlo-600">
        Bientôt disponible
      </span>
    </article>
  );
}

export function BlogListPage() {
  const featured = posts.filter((post) => post.featured);
  const regular = posts.filter((post) => !post.featured);

  return (
    <>
      <section className="bg-devlo-800 pt-16 text-white">
        <div className="mx-auto w-full max-w-screen-xl px-6 pb-14 text-center lg:px-10">
          <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">
            Ameliorer votre acquisition client B2B.
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-cyan-100/90 md:text-base">
            Identifier, demarrer, convertir et suivre vos premiers rendez-vous qualifies.
          </p>
        </div>
        <WaveDivider tone="light" />
      </section>

      <section className="mx-auto w-full max-w-screen-xl px-6 py-12 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {regular.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl px-6 pb-16 lg:px-10">
        <div className="rounded-xl border border-stroke bg-white p-8 shadow-soft lg:p-10">
          <h2 className="text-2xl font-semibold text-devlo-900">Besoin d&apos;un plan outbound adapté ?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-devlo-700/80">
            Nous analysons vos segments cibles et proposons un plan actionnable pour accélérer votre
            acquisition B2B.
          </p>
          <Link prefetch={false}
            href="/notrerendez-vous"
            className="mt-6 inline-flex h-11 items-center rounded-md bg-devlo-700 px-5 text-sm font-semibold text-white hover:bg-devlo-900 transition-colors"
          >
            Planifier un échange
          </Link>
        </div>
      </section>
    </>
  );
}
