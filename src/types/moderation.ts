export type ModerationTier = 'tier1_metadata' | 'tier2_lexicon' | 'tier3_ai_nlp' | 'tier4_human_desk' | 'tier5_user_report';

export interface ModerationRule {
  id: string;
  code: string;
  description: string;
  action: 'reject' | 'flag_for_review';
}

export interface ModerationReport {
  id: string;
  bookId: string;
  bookTitle: string;
  authorName: string;
  reportedBy: string;
  reason: 'explicit_erotica' | 'copyright_issue' | 'offensive_content' | 'corrupted_formatting';
  details: string;
  timestamp: string;
  resolved: boolean;
  resolutionNote?: string;
}

export interface ModerationQueueItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  language: string;
  provider: string;
  flaggedReason: string;
  detectedTier: ModerationTier;
  confidenceScore: number;
  sampleSnippet: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
