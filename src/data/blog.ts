import type { BlogPost } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-1',
    slug: 'comprendre-la-torrefaction',
    title: 'Comprendre la torréfaction : claire, médium, foncée',
    excerpt:
      "La torréfaction transforme le grain vert en ce que vous connaissez dans votre tasse. Petit guide pour s'y retrouver.",
    cover: {
      src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Grains de café en train d’être torréfiés',
    },
    category: 'Torréfaction',
    author: 'Équipe Kaisen',
    publishedAt: '2025-03-12',
    readMinutes: 6,
    content: [
      "La torréfaction est le moment où le grain vert — dur, herbacé, presque sans goût — devient le café que vous connaissez. Sous l'effet de la chaleur, les sucres caramélisent, les acides se transforment, et des centaines de composés aromatiques apparaissent.",
      "Une torréfaction claire préserve l'acidité et les notes florales ou fruitées. Elle convient particulièrement aux cafés d'origine unique et aux méthodes douces (V60, Chemex).",
      "Une torréfaction foncée développe des notes de cacao, de caramel brûlé, parfois de bois. Elle convient à l'espresso et au moka, où l'on cherche du corps et une amertume noble.",
      "Chez Kaisen Coffee, nous torréfions chaque origine séparément, en petits lots, pour respecter son profil. C'est ce qui nous permet de vous garantir des notes aromatiques fidèles dans chaque tasse.",
    ],
  },
  {
    id: 'b-2',
    slug: 'v60-le-guide-simple',
    title: 'V60 : le guide simple pour un café clair et net',
    excerpt:
      "Pas besoin d'être barista. Voici la méthode V60 expliquée pas à pas, avec les proportions qui marchent à tous les coups.",
    cover: {
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      alt: 'Préparation d’un café filtre en V60',
    },
    category: 'Préparation',
    author: 'Équipe Kaisen',
    publishedAt: '2025-02-20',
    readMinutes: 5,
    content: [
      "Le V60 est un dripper conique qui produit un café clair, aromatique, avec une acidité bien définie. C'est l'outil idéal pour découvrir une origine unique.",
      "Ratio de départ : 15 g de café pour 250 ml d'eau. Mouture moyenne, eau à 92-94 °C.",
      "Versez d'abord 50 ml pour le pré-infusion, laissez reposer 30 secondes. Puis versez en spirale, en trois fois, jusqu'à 250 ml. La préparation totale doit durer environ 2 min 30.",
      "Ajustez ensuite selon votre goût : mouture plus fine si le café est trop acide, plus grossière s'il est amer.",
    ],
  },
  {
    id: 'b-3',
    slug: 'origines-yirgacheffe',
    title: 'Yirgacheffe : pourquoi cette origine fascine',
    excerpt:
      "Cultivé à près de 2 000 m dans le sud de l'Éthiopie, le Yirgacheffe est l'un des cafés les plus reconnaissables au monde.",
    cover: {
      src: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=1200&q=80',
      alt: 'Plantation de café en Éthiopie',
    },
    category: 'Origines',
    author: 'Équipe Kaisen',
    publishedAt: '2025-01-08',
    readMinutes: 7,
    content: [
      "Le Yirgacheffe pousse dans le sud de l'Éthiopie, à des altitudes qui dépassent souvent 2 000 m. Cette altitude, combinée à un traitement lavé traditionnel, donne des cafés d'une clarté remarquable.",
      "Au nez : jasmin, bergamote, parfois pêche blanche. En bouche : acidité vive mais soyeuse, corps léger, finale longue et florale.",
      "C'est un café qui demande une préparation douce. En espresso, il peut paraître trop acide. En V60 ou Chemex, il révèle toute sa complexité.",
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);