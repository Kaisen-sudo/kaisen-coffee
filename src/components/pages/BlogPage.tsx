import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BLOG_POSTS } from '@/data/blog';
import { formatDate } from '@/lib/format';

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Journal — Kaisen Coffee';
  }, []);

  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Journal</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
          Notes de torréfacteur.
        </h1>
        <p className="mt-4 text-sm text-espresso/65 sm:text-base">
          Torréfaction, origines, préparation : nos articles pour aller plus loin dans la tasse.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-espresso/8 bg-warm-white shadow-soft transition-all duration-400 hover:-translate-y-1 hover:shadow-deep"
          >
            <Link to={`/blog/${post.slug}`} className="aspect-[16/10] overflow-hidden">
              <img
                src={post.cover.src}
                alt={post.cover.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-caramel">
                {post.category}
              </p>
              <h2 className="mt-2 font-display text-lg font-bold leading-snug text-espresso">
                <Link to={`/blog/${post.slug}`} className="hover:text-caramel">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-espresso/70">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-espresso/55">
                <span>{formatDate(post.publishedAt)} · {post.readMinutes} min</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-caramel transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}