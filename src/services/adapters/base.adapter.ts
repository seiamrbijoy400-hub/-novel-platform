import { Book } from '../../types/book';
import { IngestItemResult } from '../../types/provider';

export interface IContentProviderAdapter {
  readonly providerCode: string;
  readonly providerName: string;

  /**
   * Performs catalog synchronization from the distributor API/feed
   */
  syncCatalog(): Promise<IngestItemResult[]>;

  /**
   * Fetches full metadata and rights breakdown for a given external title
   */
  fetchMetadata(externalId: string): Promise<Partial<Book> | null>;

  /**
   * Confirms whether complete reading is authorized for a specific territory
   */
  checkReadingRights(externalId: string, territoryCode: string): Promise<{ authorized: boolean; reason: string }>;
}
