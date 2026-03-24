import type { SupportedLocale } from "@/lib/i18n/slug-map";

export type DictationCleanContent = {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  breadcrumbInsights: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  authorLine: string;
  readingTime: string;
  problemTitle: string;
  problemParagraphs: string[];
  solutionTitle: string;
  solutionParagraphs: string[];
  tools: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  beforeAfterTitle: string;
  beforeAfterIntro: string;
  beforeLabel: string;
  beforeText: string;
  afterLabel: string;
  afterTitle: string;
  afterParagraph: string;
  nextStepsLabel: string;
  nextSteps: string[];
  setupTitle: string;
  setupIntro: string;
  howToSteps: Array<{
    title: string;
    description: string;
  }>;
  useCasesTitle: string;
  useCasesIntro: string;
  useCases: Array<{
    label: string;
    description: string;
  }>;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  furtherTitle: string;
  furtherParagraphParts: [string, string, string, string, string, string, string, string];
  updatedLabel: string;
};

const contentByLocale: Record<SupportedLocale, DictationCleanContent> = {
  fr: {
    metaTitle: "Dictation-Clean — Dictez, l’IA structure en moins d’une minute",
    metaDescription:
      "Transformez vos dictées vocales en contenus structurés avec Wispr Flow et Claude Code. Guide étape par étape pour gagner du temps sur chaque idée.",
    breadcrumbHome: "Accueil",
    breadcrumbInsights: "Insights",
    heroEyebrow: "Insight",
    heroTitle: "Dictation-Clean",
    heroSubtitle: "Vous dictez. L’IA structure. En moins d’une minute.",
    authorLine: "Par Charles Perret",
    readingTime: "Mars 2026 · 4 min de lecture",
    problemTitle: "Le problème",
    problemParagraphs: [
      "Vous avez des idées toute la journée. En voiture, entre deux meetings, en marchant. Mais au moment de les écrire, la moitié a disparu. Et la dictée brute ? Inutilisable.",
      "Selon une analyse interne menée chez devlo, taper un prompt structuré à un LLM prend en moyenne cinq fois plus de temps que de le dicter. Le problème n’est pas la dictée : c’est que la transcription brute est un mur de texte sans structure, sans action, sans intention claire.",
    ],
    solutionTitle: "Comment transformer une dictée en contenu actionnable ?",
    solutionParagraphs: [
      "Dictation-Clean combine deux outils pour transformer la voix brute en sortie structurée en moins d’une minute : un transcripteur temps réel et un skill IA de nettoyage.",
    ],
    tools: [
      {
        number: "1",
        title: "Wispr Flow",
        description: "Capture votre voix dans n’importe quelle app, dans n’importe quelle langue. Tourne silencieusement en arrière-plan.",
      },
      {
        number: "2",
        title: "Claude Code + skill /dc",
        description: "Lit la transcription brute, identifie l’intention et restructure la sortie avec titres, actions et prochaines étapes.",
      },
    ],
    beforeAfterTitle: "Avant / Après",
    beforeAfterIntro: "La différence est immédiate. Une dictée de 3 minutes donne un document structuré, prêt à utiliser.",
    beforeLabel: "Dictée brute",
    beforeText:
      "« Donc en gros ce que je veux dire c’est qu’on devrait probablement regarder les signaux d’intention parce que les boîtes qui recrutent des commerciaux en ce moment sont probablement celles qui ont besoin de nous et on pourrait scraper LinkedIn pour ça... »",
    afterLabel: "Après /dc",
    afterTitle: "Signal d’intention : recrutement commercial comme indicateur d’achat",
    afterParagraph:
      "Les entreprises qui recrutent activement des commerciaux signalent une demande de pipeline non satisfaite, ce qui en fait un indicateur fort pour des services d’outbound.",
    nextStepsLabel: "Prochaines étapes :",
    nextSteps: [
      "Scraper LinkedIn Jobs pour les postes commerciaux en Suisse",
      "Croiser avec la liste ICP existante",
      "Tester une séquence outreach sur les 20 meilleurs matchs",
    ],
    setupTitle: "Guide étape par étape — 10 minutes",
    setupIntro: "Voici comment configurer Dictation-Clean de zéro. Tout est gratuit ou déjà inclus dans les outils que vous utilisez.",
    howToSteps: [
      {
        title: "Installer Wispr Flow",
        description: "Téléchargez Wispr Flow. Il tourne en arrière-plan et transcrit tout ce que vous dictez dans n’importe quelle application.",
      },
      {
        title: "Configurer le skill /dc dans Claude Code",
        description: "Ajoutez le skill /dc à vos commandes Claude Code pour qu’il lise votre transcription brute et la restructure selon votre intention.",
      },
      {
        title: "Dicter vos idées",
        description: "Parlez naturellement. Expliquez votre réflexion, décrivez un process, videz votre cerveau. Le désordre est normal à ce stade.",
      },
      {
        title: "Lancer le skill",
        description: "Le skill analyse la transcription, identifie le format voulu et transforme le brouillon en contenu exploitable.",
      },
      {
        title: "Relire et publier",
        description: "Vous obtenez un document propre, éditable et prêt à être partagé, publié ou transmis à une équipe.",
      },
    ],
    useCasesTitle: "Ce que j’en fais",
    useCasesIntro:
      "Sur les trois derniers mois, presque tous les contenus qui passaient par « je m’assieds et j’écris » sont passés à « je dicte et je relis ».",
    useCases: [
      { label: "Posts LinkedIn", description: "Dicter l’idée, obtenir un brouillon structuré" },
      { label: "Débriefs de meeting", description: "Parler des points clés, obtenir les actions" },
      { label: "Briefs clients", description: "Décrire le scope, obtenir un document formaté" },
      { label: "Emails", description: "Dicter l’intention, obtenir un message propre" },
      { label: "Notes de stratégie", description: "Penser à voix haute, obtenir une réflexion organisée" },
      { label: "Scripts vidéo", description: "Décrire le narratif, obtenir un script structuré" },
    ],
    ctaTitle: "Télécharger le skill",
    ctaBody: "Abonnez-vous ci-dessous et recevez le guide complet avec le fichier skill, la configuration et les astuces avancées.",
    ctaPrimary: "Réserver une consultation",
    ctaSecondary: "Voir nos services",
    furtherTitle: "Pour aller plus loin",
    furtherParagraphParts: [
      "Dictation-Clean s’intègre dans l’écosystème d’automatisation de ",
      "devlo",
      ". Découvrez comment nous appliquons l’IA au ",
      "cold email",
      ", au ",
      "LinkedIn outreach",
      " et à la ",
      "génération de leads B2B.",
    ],
    updatedLabel: "Dernière mise à jour : mars 2026",
  },
  en: {
    metaTitle: "Dictation-Clean — Dictate first, let AI structure it in under a minute",
    metaDescription:
      "Turn voice dictation into structured content with Wispr Flow and Claude Code. Step-by-step guide to save time on every idea.",
    breadcrumbHome: "Home",
    breadcrumbInsights: "Insights",
    heroEyebrow: "Insight",
    heroTitle: "Dictation-Clean",
    heroSubtitle: "You dictate. AI structures. In under a minute.",
    authorLine: "By Charles Perret",
    readingTime: "March 2026 · 4 min read",
    problemTitle: "The problem",
    problemParagraphs: [
      "You get ideas all day long: in the car, between meetings, while walking. By the time you try to write them down, half of them are gone. Raw dictation is rarely usable as-is.",
      "Based on internal usage at devlo, typing a structured prompt for an LLM takes roughly five times longer than dictating it. The issue is not the dictation itself. The issue is that raw transcription is just a wall of text with no structure, no action items, and no clear intent.",
    ],
    solutionTitle: "How do you turn dictation into actionable content?",
    solutionParagraphs: [
      "Dictation-Clean combines two tools to turn raw voice into structured output in under a minute: a real-time transcription layer and an AI clean-up skill.",
    ],
    tools: [
      {
        number: "1",
        title: "Wispr Flow",
        description: "Captures your voice in any app, in any language, and runs quietly in the background.",
      },
      {
        number: "2",
        title: "Claude Code + /dc skill",
        description: "Reads the raw transcript, identifies the intent, and restructures the output into headings, actions, and next steps.",
      },
    ],
    beforeAfterTitle: "Before / After",
    beforeAfterIntro: "The difference is immediate. A 3-minute dictation becomes a structured document ready to use.",
    beforeLabel: "Raw dictation",
    beforeText:
      "\"What I mean is that we should probably look at buying signals because companies hiring sales reps right now are probably the ones that need us, and we could scrape LinkedIn for that...\"",
    afterLabel: "After /dc",
    afterTitle: "Buying signal: sales hiring as a purchase indicator",
    afterParagraph:
      "Companies actively hiring salespeople often signal unsatisfied pipeline demand, which makes that a strong indicator for outbound services.",
    nextStepsLabel: "Next steps:",
    nextSteps: [
      "Scrape LinkedIn Jobs for sales roles in Switzerland",
      "Cross-reference with the existing ICP list",
      "Test an outreach sequence on the top 20 matches",
    ],
    setupTitle: "Step-by-step setup — 10 minutes",
    setupIntro: "Here is how to set up Dictation-Clean from scratch. Everything is free or already included in tools you are likely using.",
    howToSteps: [
      {
        title: "Install Wispr Flow",
        description: "Download Wispr Flow. It runs in the background and transcribes whatever you dictate in any application.",
      },
      {
        title: "Set up the /dc skill in Claude Code",
        description: "Add the /dc skill so Claude Code can read your raw transcript and reshape it around your intent.",
      },
      {
        title: "Dictate your ideas",
        description: "Speak naturally. Explain your reasoning, describe a process, dump your thoughts. Disorder at this stage is expected.",
      },
      {
        title: "Run the skill",
        description: "The skill analyses the transcript, recognises the intended output, and turns it into usable content.",
      },
      {
        title: "Review and publish",
        description: "You end up with a clean document that is ready to edit, share, or publish.",
      },
    ],
    useCasesTitle: "What I use it for",
    useCasesIntro:
      "Over the last three months, most content that used to start with \"sit down and write\" now starts with \"dictate first, then review\".",
    useCases: [
      { label: "LinkedIn posts", description: "Dictate the idea, get a structured draft" },
      { label: "Meeting debriefs", description: "Talk through key points, get action items" },
      { label: "Client briefs", description: "Describe scope, get a formatted document" },
      { label: "Emails", description: "Dictate intent, get a clean message" },
      { label: "Strategy notes", description: "Think out loud, get organised reasoning" },
      { label: "Video scripts", description: "Describe the narrative, get a structured script" },
    ],
    ctaTitle: "Download the skill",
    ctaBody: "Subscribe below and receive the full guide, the skill file, the setup steps, and a few advanced tips.",
    ctaPrimary: "Book a consultation",
    ctaSecondary: "See our services",
    furtherTitle: "Go further",
    furtherParagraphParts: [
      "Dictation-Clean fits into the wider automation ecosystem at ",
      "devlo",
      ". See how we apply AI to ",
      "cold email",
      ", ",
      "LinkedIn outreach",
      ", and ",
      "B2B lead generation.",
    ],
    updatedLabel: "Last updated: March 2026",
  },
  de: {
    metaTitle: "Dictation-Clean — Erst diktieren, dann von KI in unter einer Minute strukturieren lassen",
    metaDescription:
      "Verwandeln Sie Sprachdikate mit Wispr Flow und Claude Code in strukturierte Inhalte. Schritt-für-Schritt-Anleitung, um bei jeder Idee Zeit zu sparen.",
    breadcrumbHome: "Startseite",
    breadcrumbInsights: "Insights",
    heroEyebrow: "Insight",
    heroTitle: "Dictation-Clean",
    heroSubtitle: "Sie diktieren. Die KI strukturiert. In unter einer Minute.",
    authorLine: "Von Charles Perret",
    readingTime: "März 2026 · 4 Min. Lesezeit",
    problemTitle: "Das Problem",
    problemParagraphs: [
      "Ideen entstehen den ganzen Tag: im Auto, zwischen Meetings, unterwegs. Wenn Sie sie später aufschreiben wollen, ist die Hälfte bereits weg. Rohes Diktat ist selten direkt nutzbar.",
      "Nach interner Nutzung bei devlo dauert es ungefähr fünfmal länger, einen strukturierten Prompt für ein LLM zu tippen, als ihn zu diktieren. Das Problem ist nicht die Spracheingabe, sondern dass die rohe Transkription nur ein Textblock ohne Struktur, Aktionen und klare Intention ist.",
    ],
    solutionTitle: "Wie wird aus einem Diktat nutzbarer Content?",
    solutionParagraphs: [
      "Dictation-Clean kombiniert zwei Werkzeuge, um rohe Sprache in weniger als einer Minute in strukturierte Ausgabe umzuwandeln: Echtzeit-Transkription und ein KI-Skill zur Bereinigung.",
    ],
    tools: [
      {
        number: "1",
        title: "Wispr Flow",
        description: "Erfasst Ihre Stimme in jeder App, in jeder Sprache, und läuft unauffällig im Hintergrund.",
      },
      {
        number: "2",
        title: "Claude Code + /dc-Skill",
        description: "Liest das rohe Transkript, erkennt die Intention und strukturiert das Ergebnis in Überschriften, Aktionen und nächste Schritte.",
      },
    ],
    beforeAfterTitle: "Vorher / Nachher",
    beforeAfterIntro: "Der Unterschied ist sofort sichtbar. Aus drei Minuten Diktat wird ein strukturierter, sofort nutzbarer Text.",
    beforeLabel: "Rohes Diktat",
    beforeText:
      "\"Wir sollten uns wahrscheinlich Buying Signals ansehen, weil Firmen, die gerade Vertriebsleute einstellen, wahrscheinlich genau die sind, die uns brauchen, und dafür könnten wir LinkedIn scrapen...\"",
    afterLabel: "Nach /dc",
    afterTitle: "Kaufsignal: Vertriebseinstellungen als Kaufindikator",
    afterParagraph:
      "Unternehmen, die aktiv Vertriebsmitarbeitende einstellen, signalisieren oft ungedeckten Pipeline-Bedarf. Das ist ein starkes Signal für Outbound-Services.",
    nextStepsLabel: "Nächste Schritte:",
    nextSteps: [
      "LinkedIn Jobs nach Vertriebsrollen in der Schweiz durchsuchen",
      "Mit der bestehenden ICP-Liste abgleichen",
      "Eine Outreach-Sequenz auf die 20 besten Treffer testen",
    ],
    setupTitle: "Schritt-für-Schritt-Setup — 10 Minuten",
    setupIntro: "So richten Sie Dictation-Clean von Grund auf ein. Alles ist kostenlos oder bereits in Ihren Tools enthalten.",
    howToSteps: [
      {
        title: "Wispr Flow installieren",
        description: "Laden Sie Wispr Flow herunter. Es läuft im Hintergrund und transkribiert alles, was Sie in einer App diktieren.",
      },
      {
        title: "Den /dc-Skill in Claude Code einrichten",
        description: "Fügen Sie den /dc-Skill hinzu, damit Claude Code Ihr Rohtranskript lesen und nach Intention strukturieren kann.",
      },
      {
        title: "Ideen diktieren",
        description: "Sprechen Sie natürlich. Erklären Sie Ihre Gedanken, beschreiben Sie Prozesse, sprechen Sie frei. Unordnung ist an dieser Stelle normal.",
      },
      {
        title: "Den Skill ausführen",
        description: "Der Skill analysiert das Transkript, erkennt das gewünschte Format und macht daraus nutzbaren Inhalt.",
      },
      {
        title: "Überarbeiten und veröffentlichen",
        description: "Sie erhalten ein sauberes Dokument, das Sie direkt bearbeiten, teilen oder veröffentlichen können.",
      },
    ],
    useCasesTitle: "Wofür ich es nutze",
    useCasesIntro:
      "In den letzten drei Monaten hat sich fast jeder Inhalt, der früher mit \"hinsetzen und schreiben\" begann, in \"erst diktieren, dann prüfen\" verwandelt.",
    useCases: [
      { label: "LinkedIn-Posts", description: "Idee diktieren, strukturierten Entwurf erhalten" },
      { label: "Meeting-Debriefs", description: "Kernpunkte besprechen, Aktionen erhalten" },
      { label: "Kundenbriefings", description: "Umfang beschreiben, formatiertes Dokument erhalten" },
      { label: "E-Mails", description: "Intention diktieren, saubere Nachricht erhalten" },
      { label: "Strategienotizen", description: "Laut denken, geordnete Argumentation erhalten" },
      { label: "Videoskripte", description: "Narrativ beschreiben, strukturiertes Skript erhalten" },
    ],
    ctaTitle: "Den Skill herunterladen",
    ctaBody: "Abonnieren Sie unten und erhalten Sie die vollständige Anleitung, die Skill-Datei, das Setup und einige fortgeschrittene Tipps.",
    ctaPrimary: "Beratung buchen",
    ctaSecondary: "Unsere Leistungen ansehen",
    furtherTitle: "Mehr dazu",
    furtherParagraphParts: [
      "Dictation-Clean ist Teil des grösseren Automatisierungs-Ökosystems von ",
      "devlo",
      ". Sehen Sie, wie wir KI für ",
      "Cold Email",
      ", ",
      "LinkedIn Outreach",
      " und ",
      "B2B-Leadgenerierung einsetzen.",
    ],
    updatedLabel: "Zuletzt aktualisiert: März 2026",
  },
  nl: {
    metaTitle: "Dictation-Clean — Eerst dicteren, daarna laat AI het in minder dan een minuut structureren",
    metaDescription:
      "Zet spraakdictatie om in gestructureerde content met Wispr Flow en Claude Code. Stapsgewijze handleiding om tijd te winnen op elke ingeving.",
    breadcrumbHome: "Home",
    breadcrumbInsights: "Insights",
    heroEyebrow: "Insight",
    heroTitle: "Dictation-Clean",
    heroSubtitle: "Jij dicteert. AI structureert. In minder dan een minuut.",
    authorLine: "Door Charles Perret",
    readingTime: "Maart 2026 · 4 min leestijd",
    problemTitle: "Het probleem",
    problemParagraphs: [
      "Ideeën komen de hele dag door: in de auto, tussen meetings, tijdens het wandelen. Tegen de tijd dat je ze wilt uitschrijven, is de helft weg. Ruwe dictatie is zelden meteen bruikbaar.",
      "Uit intern gebruik bij devlo blijkt dat een gestructureerde prompt voor een LLM typen ongeveer vijf keer langer duurt dan hem dicteren. Het probleem is niet de dictatie zelf, maar dat de ruwe transcriptie één blok tekst is zonder structuur, acties of duidelijke intentie.",
    ],
    solutionTitle: "Hoe maak je van dictatie bruikbare content?",
    solutionParagraphs: [
      "Dictation-Clean combineert twee tools om ruwe spraak in minder dan een minuut om te zetten in gestructureerde output: realtime transcriptie en een AI-skill voor opschoning.",
    ],
    tools: [
      {
        number: "1",
        title: "Wispr Flow",
        description: "Legt je stem vast in elke app, in elke taal, en draait stil op de achtergrond.",
      },
      {
        number: "2",
        title: "Claude Code + /dc-skill",
        description: "Leest de ruwe transcriptie, herkent de intentie en zet het resultaat om in koppen, acties en volgende stappen.",
      },
    ],
    beforeAfterTitle: "Voor / Na",
    beforeAfterIntro: "Het verschil is meteen zichtbaar. Een dictaat van 3 minuten wordt een gestructureerd document dat direct bruikbaar is.",
    beforeLabel: "Ruwe dictatie",
    beforeText:
      "\"We moeten waarschijnlijk naar koopsignalen kijken, want bedrijven die nu salesmensen aannemen zijn waarschijnlijk net de bedrijven die ons nodig hebben, en daarvoor zouden we LinkedIn kunnen scrapen...\"",
    afterLabel: "Na /dc",
    afterTitle: "Koopsignaal: commerciële hiring als aankoopindicator",
    afterParagraph:
      "Bedrijven die actief salesmensen aanwerven signaleren vaak een onvervulde pipelinebehoefte. Dat maakt het een sterk signaal voor outbound diensten.",
    nextStepsLabel: "Volgende stappen:",
    nextSteps: [
      "LinkedIn Jobs scrapen voor salesfuncties in Zwitserland",
      "Kruisen met de bestaande ICP-lijst",
      "Een outreach-sequentie testen op de beste 20 matches",
    ],
    setupTitle: "Stap-voor-stap setup — 10 minuten",
    setupIntro: "Zo zet je Dictation-Clean vanaf nul op. Alles is gratis of zit al in de tools die je gebruikt.",
    howToSteps: [
      {
        title: "Wispr Flow installeren",
        description: "Download Wispr Flow. Het draait op de achtergrond en transcribeert alles wat je in een app dicteert.",
      },
      {
        title: "De /dc-skill instellen in Claude Code",
        description: "Voeg de /dc-skill toe zodat Claude Code je ruwe transcriptie kan lezen en structureren volgens de bedoeling.",
      },
      {
        title: "Je ideeën dicteren",
        description: "Praat natuurlijk. Leg je redenering uit, beschrijf een proces, dump je gedachten. Rommeligheid in deze fase is normaal.",
      },
      {
        title: "De skill uitvoeren",
        description: "De skill analyseert de transcriptie, herkent het gewenste formaat en maakt er bruikbare content van.",
      },
      {
        title: "Nalezen en publiceren",
        description: "Je krijgt een schoon document dat klaar is om te bewerken, te delen of te publiceren.",
      },
    ],
    useCasesTitle: "Waar ik het voor gebruik",
    useCasesIntro:
      "In de afgelopen drie maanden is bijna elk type content dat vroeger begon met \"gaan zitten en schrijven\" veranderd in \"eerst dicteren, daarna nalezen\".",
    useCases: [
      { label: "LinkedIn-posts", description: "Het idee dicteren, een gestructureerde draft krijgen" },
      { label: "Meetingdebriefs", description: "Belangrijkste punten uitspreken, acties krijgen" },
      { label: "Klantbriefings", description: "Scope beschrijven, een opgemaakt document krijgen" },
      { label: "E-mails", description: "Intentie dicteren, een nette boodschap krijgen" },
      { label: "Strategienotities", description: "Hardop denken, een georganiseerde redenering krijgen" },
      { label: "Videoscripts", description: "Verhaallijn beschrijven, een gestructureerd script krijgen" },
    ],
    ctaTitle: "Download de skill",
    ctaBody: "Schrijf je hieronder in en ontvang de volledige gids, het skill-bestand, de setup en enkele geavanceerde tips.",
    ctaPrimary: "Boek een consultatie",
    ctaSecondary: "Bekijk onze diensten",
    furtherTitle: "Verder gaan",
    furtherParagraphParts: [
      "Dictation-Clean past binnen het bredere automatiseringsecosysteem van ",
      "devlo",
      ". Ontdek hoe wij AI toepassen op ",
      "cold email",
      ", ",
      "LinkedIn outreach",
      " en ",
      "B2B leadgeneratie.",
    ],
    updatedLabel: "Laatst bijgewerkt: maart 2026",
  },
};

export function getLocalizedDictationCleanContent(locale: SupportedLocale): DictationCleanContent {
  return contentByLocale[locale] ?? contentByLocale.fr;
}
