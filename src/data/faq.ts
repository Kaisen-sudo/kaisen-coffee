import type { FaqItem } from '@/types';

export const FAQ: FaqItem[] = [
  {
    id: 'f-1',
    category: 'commandes',
    question: 'Comment passer une commande ?',
    answer:
      "Ajoutez vos cafés au panier, validez votre commande en quelques étapes, choisissez la livraison et le mode de paiement. Vous recevrez une confirmation par e-mail.",
  },
  {
    id: 'f-2',
    category: 'livraison',
    question: 'Quels sont les délais de livraison ?',
    answer:
      "Livraison standard : 2 à 4 jours ouvrés en Haïti. Livraison express : 24 à 48 h à Port-au-Prince. Retrait en boutique possible sous 2 h pendant les horaires d'ouverture.",
  },
  {
    id: 'f-3',
    category: 'livraison',
    question: 'La livraison est-elle offerte ?',
    answer:
      "Oui, la livraison standard est offerte pour toute commande supérieure à 4 000 G. En-dessous, une participation de 250 G s'applique (600 G en express).",
  },
  {
    id: 'f-4',
    category: 'paiement',
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer:
      "Carte bancaire, MonCash et paiement à la livraison. Le paiement par carte est traité via un prestataire sécurisé — aucune donnée bancaire n'est stockée chez nous.",
  },
  {
    id: 'f-5',
    category: 'retours',
    question: 'Puis-je retourner un produit ?',
    answer:
      "Les cafés non ouverts peuvent être retournés sous 14 jours. Les produits ouverts ne sont pas repris pour des raisons d'hygiène. Voir notre politique de retour pour le détail.",
  },
  {
    id: 'f-6',
    category: 'conservation',
    question: 'Comment conserver mon café ?',
    answer:
      "Gardez-le dans son sachet d'origine, fermé hermétiquement, à l'abri de la lumière, de la chaleur et de l'humidité. Idéalement, consommez-le dans les 4 semaines après ouverture.",
  },
  {
    id: 'f-7',
    category: 'preparation',
    question: 'Quelle mouture choisir ?',
    answer:
      "Espresso : mouture fine. V60 / Chemex : mouture moyenne. French press : mouture grossière. Cold brew : mouture très grossière. Nous pouvons moudre à la commande, précisez-le dans les notes.",
  },
  {
    id: 'f-8',
    category: 'abonnement',
    question: 'Comment fonctionne l’abonnement ?',
    answer:
      "Vous choisissez votre fréquence (toutes les 2, 4 ou 8 semaines), vos cafés préférés, et nous livrons automatiquement. Pause et annulation libres à tout moment depuis votre compte.",
  },
];