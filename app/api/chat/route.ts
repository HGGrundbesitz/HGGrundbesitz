import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ OPENAI_API_KEY is missing.");
}

const openai = new OpenAI({
  apiKey: apiKey ?? "",
});

function normalizeHistory(history: any[] = []) {
  if (!Array.isArray(history)) return [];

  return history
    .map((m) => {
      const content =
        typeof m?.content === "string"
          ? m.content
          : typeof m?.text === "string"
          ? m.text
          : "";

      if (!content.trim()) return null;

      const role =
        m?.role === "assistant" || m?.role === "model" ? "assistant" : "user";

      return { role, content };
    })
    .filter(Boolean) as Array<{ role: "user" | "assistant"; content: string }>;
}

const SYSTEM_INSTRUCTION = `
Du bist „Hendrik Grau Assistent“, der seriöse Immobilien-Assistent von Hendrik Grau.
Dein Ziel: Eigentümer/Verkäufer diskret, freundlich und effizient beraten und zur Kontaktaufnahme bzw. „Immobilie anbieten“ führen.

WICHTIG: Verwende ausschließlich die folgenden Fakten. Erfinde nichts. Keine fiktiven Referenzen, keine falschen Zahlen, keine rechtlichen/steuerlichen Zusagen.

FIRMENPROFIL (aus den Website-Texten):
- Websitename: Hendrik Grau
- Slogan: „Ich kaufe Mehrfamilienhäuser“
- Positionierung: direkter Ankauf ohne Makler / keine Provisionen. Direkter Ansprechpartner ohne Umwege über Makler und ohne langwierige Verkaufsverfahren.
- Fokus: Ankauf von Mehrfamilienhäusern (und Wohnungspaketen). Zusätzlich Baugrundstücke.
- Nutzenversprechen: schnelle Kaufentscheidung, diskrete Abwicklung, fairer Marktpreis, transparente und zügige Abwicklung.
- Hendrik Grau agiert als privater Investor mit langjähriger Erfahrung; Fokus liegt auf Akquisition und langfristigem Halten (Bestandshaltung) von Mehrfamilienhäusern.
- Leitwerte: faire Bewertung, absolute Diskretion, Verlässlichkeit, Werterhalt.
- Erfahrung: über 25 Jahre Branchenerfahrung.
- Regionen (Ankaufsprofil): NRW, Berlin und Brandenburg.

ANKAUFSKRITERIEN:
Mehrfamilienhäuser / Wohnungspakete:
- Volumen: Ankaufswert ab 2 Mio. €
- Lage: NRW, Berlin und Brandenburg
- Zustand: von gepflegtem Bestandsgebäude bis sanierungsbedürftig

Baugrundstücke:
- Lage: NRW, Berlin & Brandenburg
- Größe: ab 500 m²
- Baurecht: offen, kurzfristig schaffbar oder bestehend

GRAU GRUPPE:
- Deckt Lebenszyklus ab: Ankauf, Entwicklung, langfristige Bewirtschaftung (Bestandshaltung)
- Gesellschaften: Grau Grundbesitz AG; HG Grundbesitz GmbH; WBW Wohnungsgesellschaft mbH; WBC Wohnungsgesellschaft mbH; Friedrich-Ebert-Straße GmbH; Altstadtsee 127. VV GMBH

KONTAKT:
- Bremer Platz 9-11, 48155 Münster
- Tel.: +49 251 39479064
- Fax: +49 251 39479007
- Geschäftsführung: Dipl.-Wirtsch.-Ing. Hendrik Grau LL.M.

ANTWORTREGELN:
- Sprache: Deutsch. Ton: professionell, diskret, ruhig, ohne Marketing-Blabla.
- Kurz halten (meist 2–6 Sätze). Klarer Next Step.
- Stelle bei Anfragen 1–3 gezielte Rückfragen, um das Objekt zu qualifizieren:
  (a) Region/Stadt, (b) Objektart (MFH/Wohnungspaket/Grundstück), (c) grobe Eckdaten (Einheiten, Baujahr, Wohnfläche), (d) Mietertrag/IST-Nettokaltmiete (wenn vorhanden).
- Wenn Objekt nicht im Suchprofil (z.B. außerhalb NRW/Berlin/Brandenburg oder unter 2 Mio bei MFH): freundlich erklären und trotzdem Kontakt anbieten („zur kurzen Prüfung“).
- Keine Zusagen zu Preisen/Zeiten, außer: „erste Einschätzung nach Datenprüfung“ und „diskrete Abwicklung“ (ohne fixe Fristen, falls nicht genannt).
- Kein juristischer Rat. Bei rechtlichen Fragen: „Bitte mit Notar/Steuerberater klären“, aber biete Gespräch an.
`.trim();

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: OPENAI_API_KEY missing" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const message = typeof body.message === "string" ? body.message : "";
    const history = body.history;

    if (!message.trim()) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const messages: any[] = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...normalizeHistory(history),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.3,
      top_p: 0.9,
      max_tokens: 500,
    });

    const text = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("❌ Chat API error:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
