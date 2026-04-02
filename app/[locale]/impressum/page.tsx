import LegalPageShell, { LegalCard } from '@/components/LegalPageShell';

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <LegalPageShell
      badge="Impressum"
      title="Pflichtangaben zur Website."
      lead="Hier finden Sie die gesetzlich erforderlichen Anbieterangaben für den Internetauftritt der HG Grundbesitz GmbH."
      locale={locale}
      updatedAt="April 2026"
    >
      <LegalCard title="Angaben gemäß § 5 DDG">
        <p>
          HG Grundbesitz GmbH
          <br />
          Bremer Platz 9-11
          <br />
          48155 Münster
          <br />
          Deutschland
        </p>
      </LegalCard>

      <LegalCard title="Vertretungsberechtigt">
        <p>Die HG Grundbesitz GmbH wird vertreten durch den Geschäftsführer Hendrik Grau.</p>
      </LegalCard>

      <LegalCard title="Kontakt">
        <p>
          Telefon: <a href="tel:+4925139479064" className="transition-colors hover:text-gold">+49 251 39479064</a>
          <br />
          Fax: +49 251 39479007
          <br />
          E-Mail:{' '}
          <a href="mailto:info@hg-grundbesitz.de" className="transition-colors hover:text-gold">
            info@hg-grundbesitz.de
          </a>
        </p>
      </LegalCard>

      <LegalCard title="Registereintrag">
        <p>
          Handelsregister: Amtsgericht Münster
          <br />
          Registernummer: HRB 9790
        </p>
      </LegalCard>

      <LegalCard title="Unternehmensgegenstand">
        <p>Entwicklung sowie An- und Verkauf von bebauten und unbebauten Grundstücken.</p>
      </LegalCard>

      <LegalCard title="Verantwortlich für den Inhalt">
        <p>
          Verantwortlich für die Inhalte dieser Website ist die HG Grundbesitz GmbH,
          vertreten durch Hendrik Grau, Anschrift wie oben.
        </p>
      </LegalCard>

      <LegalCard title="Hinweis nach § 36 VSBG">
        <p>
          Die HG Grundbesitz GmbH ist weder verpflichtet noch bereit, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalCard>
    </LegalPageShell>
  );
}
