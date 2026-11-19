import { IContentProviderAdapter } from './base.adapter';
import { IngestItemResult } from '../../types/provider';
import { Book } from '../../types/book';

export class GoogleBooksAdapter implements IContentProviderAdapter {
  public readonly providerCode = 'google_books';
  public readonly providerName = 'Google Books API (Metadata Only)';

  public async syncCatalog(): Promise<IngestItemResult[]> {
    return [
      {
        externalId: 'gb-sample-9921',
        title: 'The Whispering Manuscript (Sample)',
        author: 'Marcus Vance',
        language: 'en',
        year: 2025,
        accessType: 'preview_only', // Never marked as full_book!
        isComplete: false,
        moderationPassed: true,
      }
    ];
  }

  public async fetchMetadata(externalId: string): Promise<Partial<Book> | null> {
    return {
      sourceProviderCode: this.providerCode,
      sourceProviderName: this.providerName,
      fullBookAvailable: false, // Strict: Never pretend to have full book!
      accessType: 'preview_only',
    };
  }

  public async checkReadingRights(externalId: string, territoryCode: string): Promise<{ authorized: boolean; reason: string }> {
    return {
      authorized: false,
      reason: 'Google Books API provides discovery metadata and preview snippets only. Full-text streaming is not authorized.'
    };
  }
}
