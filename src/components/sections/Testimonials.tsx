import { Section } from '@/components/ui/Section';
import { Rating } from '@/components/ui/Rating';
import { TESTIMONIALS } from '@/data/testimonials';

export function Testimonials() {
  return (
    <Section aria-labelledby="testimonials-title" className="bg-warm-white/40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
          Ils en parlent
        </p>
        <h2 id="testimonials-title" className="mt-3 font-display text-3xl sm:text-4xl">
          La communauté Kaisen
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.slice(0, 3).map((t) => (
          <blockquote
            key={t.id}
            className="rounded-2xl border border-espresso/8 bg-warm-white p-6 shadow-soft"
          >
            <Rating value={t.rating} showValue={false} size="md" />
            <p className="mt-4 text-[15px] leading-relaxed text-espresso/80">« {t.message} »</p>
            <footer className="mt-4 flex items-center gap-3">
              <div
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full bg-caramel/15 font-display text-sm font-bold text-caramel"
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-espresso">{t.name}</p>
                <p className="text-xs text-espresso/55">{t.city}</p>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}