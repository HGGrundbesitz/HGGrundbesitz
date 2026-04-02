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
      lead="Nachfolgend informieren wir Sie gemäß Art. 13 DSGVO über Art, Umfang und Zwecke der Verarbeitung personenbezogener Daten auf dieser Website."
      locale={locale}
      updatedAt="April 2026"
    >
      <LegalCard title="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          HG Grundbesitz GmbH
          <br />
          Bremer Platz 9-11
          <br />
          48155 Münster
          <br />
          Deutschland
        </p>
        <p>
          E-Mail:{' '}
          <a href="mailto:info@hg-grundbesitz.de" className="transition-colors hover:text-gold">
            info@hg-grundbesitz.de
          </a>
          <br />
          Telefon:{' '}
          <a href="tel:+4925139479064" className="transition-colors hover:text-gold">
            +49 251 39479064
          </a>
        </p>
      </LegalCard>

      <LegalCard title="2. Zwecke und Rechtsgrundlagen der Verarbeitung">
        <p>Wir verarbeiten personenbezogene Daten ausschließlich, soweit dies für den Betrieb dieser Website und die Bearbeitung von Anfragen erforderlich ist.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen gerichtet ist.</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO für den sicheren technischen Betrieb der Website, Missbrauchsprävention, Reichweitenmessung und eine nutzerfreundliche Darstellung.</li>
          <li>Art. 6 Abs. 1 lit. c DSGVO, soweit gesetzliche Aufbewahrungs- oder Nachweispflichten bestehen.</li>
        </ul>
      </LegalCard>

      <LegalCard title="3. Bereitstellung der Website und Server-Logfiles">
        <p>
          Beim Aufruf dieser Website werden technisch erforderliche Informationen verarbeitet, damit die Seite ausgeliefert,
          stabil betrieben und gegen Missbrauch geschützt werden kann. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit
          des Zugriffs, aufgerufene Inhalte, Browsertyp, Betriebssystem, Referrer-URL und ähnliche Verbindungsdaten gehören.
        </p>
        <p>
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der
          sicheren, performanten und fehlerfreien Bereitstellung der Website.
        </p>
      </LegalCard>

      <LegalCard title="4. Kontaktaufnahme über Formular, E-Mail oder Telefon">
        <p>
          Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten, insbesondere Name, E-Mail-Adresse,
          Telefonnummer, Nachrichteninhalt und gegebenenfalls übermittelte Objekt- oder Unterlageninformationen.
        </p>
        <p>
          Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage, zur Kontaktaufnahme und zur
          Anbahnung oder Durchführung einer geschäftlichen Beziehung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          bzw. Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          Zum Schutz vor missbräuchlichen Eingaben können außerdem technische Verbindungsdaten, insbesondere die IP-Adresse,
          kurzzeitig zu Zwecken der Rate-Limitierung und Systemsicherheit verarbeitet werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </LegalCard>

      <LegalCard title="5. E-Mail-Versand über Resend">
        <p>
          Für den Versand von Benachrichtigungen und Eingangsbestätigungen nutzen wir den E-Mail-Dienst Resend
          (Plus Five Five, Inc., USA) als technischen Dienstleister. Dabei können insbesondere E-Mail-Adresse,
          Nachrichteninhalte sowie für den Versand erforderliche technische Metadaten verarbeitet werden.
        </p>
        <p>
          Die Einbindung erfolgt zur zuverlässigen Bearbeitung Ihrer Kontaktanfrage auf Grundlage von Art. 6 Abs. 1 lit. b
          und lit. f DSGVO. Soweit hierbei Daten in Staaten außerhalb der EU bzw. des EWR übermittelt werden, erfolgt dies
          nur auf Basis geeigneter Garantien.
        </p>
      </LegalCard>

      <LegalCard title="6. Webanalyse mit Vercel Analytics">
        <p>
          Diese Website verwendet Vercel Web Analytics, um aggregierte Informationen über die Nutzung der Website zu erhalten.
          Nach Angaben von Vercel erfolgt die Analyse ohne den Einsatz klassischer Drittanbieter-Cookies; erfasst werden
          insbesondere aufgerufene Seiten, Referrer, grobe Geodaten, Gerätetyp, Betriebssystem und Browserinformationen.
        </p>
        <p>
          Die Verarbeitung dient der Verbesserung unseres Webangebots und erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          Unser berechtigtes Interesse liegt in der wirtschaftlichen und technischen Optimierung der Website.
        </p>
      </LegalCard>

      <LegalCard title="7. Speicherung der Theme-Auswahl">
        <p>
          Damit Ihre Auswahl zwischen hellem und dunklem Darstellungsmodus erhalten bleibt, speichern wir lokal im Browser
          einen Eintrag im Local Storage unter dem Schlüssel <span className="font-mono text-stone-700 dark:text-stone-200">hg-theme</span>.
        </p>
        <p>
          Diese Speicherung ist erforderlich, um einen von Ihnen ausdrücklich gewünschten Funktionsumfang bereitzustellen.
          Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG sowie Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </LegalCard>

      <LegalCard title="8. Empfänger und Drittlandübermittlungen">
        <p>
          Empfänger Ihrer Daten können von uns eingesetzte technische Dienstleister sein, insbesondere in den Bereichen
          Hosting, Webanalyse, E-Mail-Versand und IT-Sicherheit. Wir wählen diese Dienstleister sorgfältig aus und binden
          sie datenschutzkonform ein.
        </p>
        <p>
          Soweit Dienstleister in Drittländern, insbesondere in den USA, eingesetzt werden, achten wir auf geeignete
          Garantien für ein angemessenes Datenschutzniveau, etwa Standardvertragsklauseln oder vergleichbare Schutzmechanismen.
        </p>
      </LegalCard>

      <LegalCard title="9. Speicherdauer">
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist.
          Anfragen und Kommunikation werden gelöscht, sobald sie für die Bearbeitung nicht mehr benötigt werden und keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
        <p>
          Technische Protokolldaten werden grundsätzlich nur für die Dauer gespeichert, die zur Sicherstellung des Betriebs,
          zur Fehleranalyse und zur Abwehr von Missbrauch erforderlich ist. Den im Browser gespeicherten Theme-Eintrag können
          Sie jederzeit selbst löschen.
        </p>
      </LegalCard>

      <LegalCard title="10. Ihre Rechte">
        <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen insbesondere folgende Rechte:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Recht auf Auskunft nach Art. 15 DSGVO</li>
          <li>Recht auf Berichtigung nach Art. 16 DSGVO</li>
          <li>Recht auf Löschung nach Art. 17 DSGVO</li>
          <li>Recht auf Einschränkung der Verarbeitung nach Art. 18 DSGVO</li>
          <li>Recht auf Datenübertragbarkeit nach Art. 20 DSGVO</li>
          <li>Recht auf Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO nach Art. 21 DSGVO</li>
          <li>Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde nach Art. 77 DSGVO</li>
        </ul>
      </LegalCard>

      <LegalCard title="11. Beschwerderecht bei einer Aufsichtsbehörde">
        <p>
          Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen
          Daten zu beschweren. Für Unternehmen in Nordrhein-Westfalen ist dies insbesondere die Landesbeauftragte für
          Datenschutz und Informationsfreiheit Nordrhein-Westfalen.
        </p>
      </LegalCard>
    </LegalPageShell>
  );
}
