import { ModerationQueueItem, ModerationReport } from '../types/moderation';

export class ModerationEngine {
  // Prohibited explicit tags (BISAC / ONIX codes)
  private static BLOCKED_BISAC_CODES = [
    'FIC005000', // Fiction / Erotica
    'FIC027000', // Fiction / Romance / Erotica
    'FIC027050', // Fiction / Romance / Adult
    'FIC033000', // Fiction / Gay Erotica
    'FIC034000', // Fiction / Lesbian Erotica
  ];

  // Blocked lexical tokens across languages for automated screening
  private static EXPLICIT_LEXICON = [
    'erotica', 'nsfw', 'pornographic', 'hentai', 'bdsm', 'smut',
    'explicit sex', 'erotic romance', 'graphic sexual', 'sexual domination'
  ];

  /**
   * Evaluates text and metadata through the multi-tier filter
   */
  public static evaluateBook(
    title: string,
    synopsis: string,
    sampleText: string,
    bisacCodes: string[] = []
  ): { passed: boolean; detectedTier?: string; score: number; reason?: string } {
    // Tier 1: Check Metadata & BISAC
    for (const code of bisacCodes) {
      if (this.BLOCKED_BISAC_CODES.includes(code.toUpperCase())) {
        return {
          passed: false,
          detectedTier: 'tier1_metadata',
          score: 1.0,
          reason: `Violates content policy: Prohibited BISAC classification (${code})`,
        };
      }
    }

    // Tier 2: Check Lexicon
    const combinedContent = `${title} ${synopsis} ${sampleText}`.toLowerCase();
    for (const token of this.EXPLICIT_LEXICON) {
      if (combinedContent.includes(token)) {
        return {
          passed: false,
          detectedTier: 'tier2_lexicon',
          score: 0.92,
          reason: `Flagged by Lexical Scanner: Contains restricted adult term "${token}"`,
        };
      }
    }

    // Tier 3: Simulated NLP confidence threshold
    // Distinguishes clean romance / emotional themes from explicit erotica
    const isRomance = combinedContent.includes('romance') || combinedContent.includes('love') || combinedContent.includes('relationship');
    if (isRomance) {
      // Clean romance passes with high confidence
      return {
        passed: true,
        detectedTier: 'tier3_ai_nlp',
        score: 0.98,
      };
    }

    return {
      passed: true,
      score: 1.0,
    };
  }
}

export const INITIAL_MODERATION_QUEUE: ModerationQueueItem[] = [
  {
    id: 'mod-1',
    bookId: 'review-101',
    title: 'Midnight Vows in Provence',
    author: 'Claire Delacroix',
    language: 'fr',
    provider: 'Draft2Digital',
    flaggedReason: 'Contains romantic terminology requiring verification against explicit boundaries',
    detectedTier: 'tier4_human_desk',
    confidenceScore: 0.88,
    sampleSnippet: 'They stood close under the olive trees, hands clasped, knowing that duty to their families stood between their hearts...',
    submittedAt: '2026-11-19T05:20:00Z',
    status: 'pending',
  },
  {
    id: 'mod-2',
    bookId: 'review-102',
    title: 'Siren of the Red Sea',
    author: 'Samir Mansour',
    language: 'ar',
    provider: 'StreetLib',
    flaggedReason: 'Borderline mystery genre classified under general romance without publisher description',
    detectedTier: 'tier4_human_desk',
    confidenceScore: 0.79,
    sampleSnippet: 'كانت السفينة تمخر عباب البحر الأحمر حاملة أسراراً من القرن الماضي...',
    submittedAt: '2026-11-19T05:45:00Z',
    status: 'pending',
  }
];

export const INITIAL_MODERATION_REPORTS: ModerationReport[] = [
  {
    id: 'rep-1',
    bookId: 'book-1',
    bookTitle: 'The Last Tide of Padma',
    authorName: 'Anisur Rahman',
    reportedBy: 'user_reader_44',
    reason: 'corrupted_formatting',
    details: 'Small font glitch on mobile screen in Chapter 2, otherwise complete and wonderful novel.',
    timestamp: '2026-11-18T14:10:00Z',
    resolved: true,
    resolutionNote: 'Inspected Bengali ligature rendering; typography verified clean.',
  }
];
