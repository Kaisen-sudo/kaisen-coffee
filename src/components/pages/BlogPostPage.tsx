import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { getPostBySlug, BLOG_POSTS } from '@/data/blog';
import { formatDate } from '@/lib/format';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) document.title = `${post.title} — Journal Kaisen`;
  }, [post]);

  if (!post) return <Navigate to="/404" replace />;

  const related = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <Container size="narrow" className="py-10 sm:py-14">
      <nav aria-label="Fil d'Ariane" className="text-xs">
        <ol className="flex flex-wrap items-center gap-1 text-espresso/55">
          <li><Link to="/" className="hover:text-caramel">Accueil</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
          <li><Link to="/blog" className="hover:text-caramel">Journal</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
          <li className="text-espresso/80 line-clamp-1">{post.title}</li>
        </ol>
      </nav>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
          {post.category}
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-espresso/60">
          Par {post.author} · {formatDate(post.publishedAt)} · {post.readMinutes} min de lecture
        </p>
      </header>

      <div className="mt-8 overflow-hidden rounded-3xl shadow-soft">
        <img
          src={post.cover.src}
          alt={post.cover.alt}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <article className="mt-10 space-y-5 text-[15px] leading-relaxed text-espresso/80">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </article>

      {related.length > 0 && (
        <section className="mt-16 border-t border-espresso/10 pt-10">
          <h2 className="font-display text-2xl">À lire aussi</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/blog/${r.slug}`}
                className="group block overflow-hidden rounded-2xl border border-espresso/10 bg-warm-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-deep"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={r.cover.src}
                    alt={r.cover.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-caramel">
                    {r.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-espresso group-hover:text-caramel">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}