import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { BRAND } from '@/lib/config';

type LegalKey = 'cgv' | 'confidentialite' | 'retours' | 'livraison';

const CONTENT: Record<LegalKey, { title: string; updated: string; sections: { heading: string; body: string[] }[] }> = {
  cgv: {
    title: 'Conditions générales de vente',
    updated: '2025-01-01',
    sections: [
      {
        heading: '1. Objet',
        body: [
          "Les présentes conditions régissent les ventes conclues via le site Kaisen Coffee. Elles sont fournies à titre indicatif dans cette démonstration et devront être adaptées au cadre juridique applicable en Haïti avant toute exploitation commerciale.",
        ],
      },
      {
        heading: '2. Produits',
        body: [
          "Les produits proposés sont des cafés torréfiés et accessoires associés. Les photographies sont non contractuelles. Les prix sont exprimés en gourdes haïtiennes (HTG), toutes taxes comprises le cas échéant.",
        ],
      },
      {
        heading: '3. Commandes',
        body: [
          "Toute commande implique l'acceptation sans réserve des présentes conditions. Nous nous réservons le droit de refuser toute commande en cas de litige antérieur ou de suspicion de fraude.",
        ],
      },
      {
        heading: '4. Prix et paiement',
        body: [
          "Les prix sont indiqués en HTG. Le paiement s'effectue par carte bancaire, MonCash, ou en espèces à la livraison.",
        ],
      },
    ],
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    updated: '2025-01-01',
    sections: [
      {
        heading: '1. Données collectées',
        body: [
          "Nous collectons uniquement les données nécessaires au traitement de vos commandes : nom, adresse, e-mail, numéro de téléphone, historique d'achat.",
        ],
      },
      {
        heading: '2. Utilisation',
        body: [
          "Ces données sont utilisées pour la préparation et la livraison des commandes, la gestion de la relation client, et — avec votre consentement — l'envoi de notre newsletter.",
        ],
      },
      {
        heading: '3. Conservation & droits',
        body: [
          "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, écrivez-nous à " + BRAND.contact.email + " (coordonnées placeholder).",
        ],
      },
    ],
  },
  retours: {
    title: 'Politique de retour',
    updated: '2025-01-01',
    sections: [
      {
        heading: '1. Produits non ouverts',
        body: [
          "Les cafés non ouverts peuvent être retournés dans les 14 jours suivant la réception, dans leur emballage d'origine.",
        ],
      },
      {
        heading: '2. Produits ouverts',
        body: [
          "Pour des raisons d'hygiène et de conservation, les produits ouverts ne sont pas repris. En cas de problème de qualité, contactez-nous sous 48 h après réception.",
        ],
      },
      {
        heading: '3. Procédure',
        body: [
          "Écrivez-nous à " + BRAND.contact.email + " ou via WhatsApp. Nous vous indiquerons la marche à suivre et prendrons en charge les frais de retour en cas d'erreur de notre part.",
        ],
      },
    ],
  },
  livraison: {
    title: 'Politique de livraison',
    updated: '2025-01-01',
    sections: [
      {
        heading: '1. Zones desservies',
        body: [
          "Nous livrons partout en Haïti. Les délais peuvent varier selon la zone et les conditions locales.",
        ],
      },
      {
        heading: '2. Délais',
        body: [
          "Standard : 2 à 4 jours ouvrés. Express : 24 à 48 h à Port-au-Prince. Retrait boutique : sous 2 h pendant les horaires d'ouverture.",
        ],
      },
      {
        heading: '3. Frais',
        body: [
          "Livraison offerte au-delà de 4 000 G. En-dessous, une participation de 250 G (standard) ou 600 G (express) s'applique.",
        ],
      },
    ],
  },
};

export default function LegalPage() {
  const { key } = useParams<{ key: string }>();
  const legalKey = key as LegalKey | undefined;

  useEffect(() => {
    if (legalKey && CONTENT[legalKey]) {
      document.title = `${CONTENT[legalKey].title} — Kaisen Coffee`;
    }
  }, [legalKey]);

  if (!legalKey || !CONTENT[legalKey]) {
    return <Navigate to="/404" replace />;
  }

  const content = CONTENT[legalKey];

  return (
    <Container size="narrow" className="py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Légal</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl">{content.title}</h1>
      <p className="mt-2 text-sm text-espresso/55">
        Dernière mise à jour : {content.updated}
      </p>

      <div className="mt-10 space-y-8">
        {content.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl text-espresso">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 text-[15px] leading-relaxed text-espresso/75">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <p className="mt-12 rounded-2xl bg-beige/60 p-4 text-xs text-espresso/60">
        Ces informations sont fournies à titre indicatif pour la démonstration. Elles devront être
        revues et complétées par un professionnel du droit avant mise en production.
      </p>
    </Container>
  );
}