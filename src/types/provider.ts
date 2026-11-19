import { AccessType } from './book';

export type ProviderType = 'commercial_aggregator' | 'direct_author_portal' | 'metadata_index' | 'public_domain';

export interface ContentProvider {
  id: string;
  code: string; // 'streetlib', 'draft2digital', 'direct_author', 'google_books'
  name: string;
  type: ProviderType;
  isActive: boolean;
  capabilities: {
    providesFullText: boolean;
    providesMetadata: boolean;
    providesPreviewOnly: boolean;
    supportedLanguages: string[];
    requiresDrm: boolean;
    drmType?: 'social_watermark' | 'readium_lcp' | 'proprietary_encrypted';
  };
  territoryCoverage: 'worldwide' | 'regional';
  allowedTerritories: string[];
  totalBooksIndexed: number;
  apiHealthStatus: 'healthy' | 'degraded' | 'offline';
  lastSyncedAt: string;
}

export interface IngestItemResult {
  externalId: string;
  title: string;
  author: string;
  language: string;
  year: number;
  accessType: AccessType;
  isComplete: boolean;
  moderationPassed: boolean;
  rejectionReason?: string;
}
