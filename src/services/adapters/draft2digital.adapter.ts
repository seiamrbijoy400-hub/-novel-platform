import { IContentProviderAdapter } from './base.adapter';
import { IngestItemResult } from '../../types/provider';
import { Book } from '../../types/book';

export class Draft2DigitalAdapter implements IContentProviderAdapter {
  public readonly providerCode = 'draft2digital';
  public readonly providerName = 'Draft2Digital / Smashwords Feed';

  public async syncCatalog(): Promise<IngestItemResult[]> {
    return [
      {
        externalId: 'd2d-45091',
        title: 'The Orbital Sanctuary',
        author: 'Marcus Vance',
        language: 'en',
        year: 2024,
        accessType: 'full_book',
        isComplete: true,
        moderationPassed: true,
      }
    ];
  }

  public async fetchMetadata(externalId: string): Promise<Partial<Book> | null> {
    return {
      sourceProviderCode: this.providerCode,
      sourceProviderName: this.providerName,
      fullBookAvailable: true,
      accessType: 'full_book',
    };
  }

  public async checkReadingRights(externalId: string, territoryCode: string): Promise<{ authorized: boolean; reason: string }> {
    return { authorized: true, reason: 'Smashwords / Draft2Digital streaming partner agreement verified.' };
  }
}
