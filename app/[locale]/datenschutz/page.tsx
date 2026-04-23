import LegalPageShell, { LegalCard } from '@/components/LegalPageShell';

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <LegalPageShell
      badge="Datenschutz"
      title="Informationen zum Umgang mit Ihren Daten."
      lead="Nachfolgend informieren wir Sie gemaess Art. 13 DSGVO ueber Art, Umfang und Zwecke der Verarbeitung personenbezogener Daten auf dieser Website."
      locale={locale}
      updatedAt="April 2026"
    >
      <LegalCard title="1. Verantwortlicher">
        <p>
          Verantwortlich fuer die Datenverarbeitung auf dieser Website ist:
          <br />
          HG Grundbesitz GmbH
          <br />
          Bremer Platz 9-11
          <br />
          48155 Muenster
          <br />
          Deutschland
        </p>
        <p>
          E-Mail:{' '}
          <a href="mailto:hg@hg-grundbesitz.de" className="transition-colors hover:text-gold">
            hg@hg-grundbesitz.de
          </a>
          <br />
          Telefon:{' '}
          <a href="tel:+4925139479064" className="transition-colors hover:text-gold">
            +49 251 39479064
          </a>
        </p>
      </LegalCard>

      <LegalCard title="2. Zwecke und Rechtsgrundlagen der Verarbeitung">
        <p>Wir verarbeiten personenbezogene Daten ausschliesslich, soweit dies fuer den Betrieb dieser Website und die Bearbeitung von Anfragen erforderlich ist.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag oder vorvertragliche Massnahmen gerichtet ist.</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO fuer den sicheren technischen Betrieb der Website, Missbrauchspraevention und eine nutzerfreundliche Darstellung.</li>
          <li>Art. 6 Abs. 1 lit. a DSGVO, soweit Sie in optionale Webanalyse einwilligen.</li>
          <li>Art. 6 Abs. 1 lit. c DSGVO, soweit gesetzliche Aufbewahrungs- oder Nachweispflichten bestehen.</li>
        </ul>
      </LegalCard>

      <LegalCard title="3. Bereitstellung der Website und Server-Logfiles">
        <p>
          Beim Aufruf dieser Website werden technisch erforderliche Informationen verarbeitet, damit die Seite ausgeliefert,
          stabil betrieben und gegen Missbrauch geschuetzt werden kann. Dazu koennen insbesondere IP-Adresse, Datum und Uhrzeit
          des Zugriffs, aufgerufene Inhalte, Browsertyp, Betriebssystem, Referrer-URL und aehnliche Verbindungsdaten gehoeren.
        </p>
        <p>
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der
          sicheren, performanten und fehlerfreien Bereitstellung der Website sowie im Schutz vor Missbrauch.
        </p>
      </LegalCard>

      <LegalCard title="4. Kontaktaufnahme per E-Mail oder Telefon">
        <p>
          Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten, insbesondere E-Mail-Adresse,
          Telefonnummer, Nachrichteninhalt und gegebenenfalls uebermittelte Objekt- oder Unterlageninformationen.
        </p>
        <p>
          Diese Daten verwenden wir ausschliesslich zur Bearbeitung Ihrer Anfrage, zur Kontaktaufnahme und zur Anbahnung oder
          Durchfuehrung einer geschaeftlichen Beziehung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw.
          Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </LegalCard>

      <LegalCard title="5. Cookie-Einwilligung">
        <p>
          Damit Ihre Auswahl fuer optionale Analysefunktionen gespeichert werden kann, setzen wir ein technisch erforderliches
          Cookie mit dem Namen <strong>hg_cookie_consent</strong>. Darin wird ausschliesslich gespeichert, ob Sie einer
          optionalen Analyse zugestimmt oder diese abgelehnt haben.
        </p>
        <p>
          Rechtsgrundlage fuer die Speicherung dieser Auswahl ist Art. 6 Abs. 1 lit. c und lit. f DSGVO in Verbindung mit
          unseren Nachweis- und Dokumentationspflichten sowie dem berechtigten Interesse, Ihre Entscheidung technisch sauber
          umzusetzen.
        </p>
      </LegalCard>

      <LegalCard title="6. Webanalyse mit Vercel Analytics">
        <p>
          Sofern Sie zustimmen, verwenden wir Vercel Web Analytics, um aggregierte Informationen ueber die Nutzung der Website
          zu erhalten. Nach Angaben von Vercel erfolgt die Analyse ohne klassische Drittanbieter-Cookies. Erfasst werden
          insbesondere aufgerufene Seiten, Referrer, geraetetypbezogene Informationen, Betriebssystem, Browserinformationen
          und ungefaehre Standortdaten.
        </p>
        <p>
          Die Verarbeitung erfolgt nur nach Ihrer Einwilligung auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Wenn Sie nicht
          zustimmen, wird Vercel Analytics auf dieser Website nicht geladen.
        </p>
      </LegalCard>

      <LegalCard title="7. Empfaenger und Drittlanduebermittlungen">
        <p>
          Empfaenger Ihrer Daten koennen von uns eingesetzte technische Dienstleister sein, insbesondere in den Bereichen
          Hosting, Webanalyse und IT-Sicherheit. Wir waehlen diese Dienstleister sorgfaeltig aus und binden sie
          datenschutzkonform ein.
        </p>
        <p>
          Soweit Dienstleister in Drittlaendern, insbesondere in den USA, eingesetzt werden, achten wir auf geeignete
          Garantien fuer ein angemessenes Datenschutzniveau, etwa Standardvertragsklauseln oder vergleichbare Schutzmechanismen.
        </p>
      </LegalCard>

      <LegalCard title="8. Speicherdauer">
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie dies fuer die jeweiligen Zwecke erforderlich ist. Anfragen und
          Kommunikation werden geloescht, sobald sie fuer die Bearbeitung nicht mehr benoetigt werden und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
        <p>
          Technische Protokolldaten werden grundsaetzlich nur fuer die Dauer gespeichert, die zur Sicherstellung des Betriebs,
          zur Fehleranalyse und zur Abwehr von Missbrauch erforderlich ist. Ihre Cookie-Auswahl speichern wir fuer bis zu
          180 Tage oder bis Sie diese in Ihrem Browser loeschen.
        </p>
      </LegalCard>

      <LegalCard title="9. Ihre Rechte">
        <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen insbesondere folgende Rechte:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Recht auf Auskunft nach Art. 15 DSGVO</li>
          <li>Recht auf Berichtigung nach Art. 16 DSGVO</li>
          <li>Recht auf Loeschung nach Art. 17 DSGVO</li>
          <li>Recht auf Einschraenkung der Verarbeitung nach Art. 18 DSGVO</li>
          <li>Recht auf Datenuebertragbarkeit nach Art. 20 DSGVO</li>
          <li>Recht auf Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO nach Art. 21 DSGVO</li>
          <li>Recht auf Beschwerde bei einer Datenschutzaufsichtsbehoerde nach Art. 77 DSGVO</li>
        </ul>
      </LegalCard>

      <LegalCard title="10. Widerruf und Beschwerderecht">
        <p>
          Eine erteilte Einwilligung fuer Webanalyse koennen Sie jederzeit mit Wirkung fuer die Zukunft widerrufen, indem Sie
          Ihre gespeicherte Cookie-Entscheidung in Ihrem Browser loeschen und die Auswahl erneut treffen.
        </p>
        <p>
          Sie haben ausserdem das Recht, sich bei einer Datenschutzaufsichtsbehoerde ueber die Verarbeitung Ihrer
          personenbezogenen Daten zu beschweren. Fuer Unternehmen in Nordrhein-Westfalen ist dies insbesondere die
          Landesbeauftragte fuer Datenschutz und Informationsfreiheit Nordrhein-Westfalen.
        </p>
      </LegalCard>
    </LegalPageShell>
  );
}
