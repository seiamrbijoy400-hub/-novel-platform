import { IContentProviderAdapter } from './base.adapter';
import { IngestItemResult } from '../../types/provider';
import { Book } from '../../types/book';

export class DirectAuthorAdapter implements IContentProviderAdapter {
  public readonly providerCode = 'direct_author';
  public readonly providerName = 'Novela Author & Small Press Portal';

  public async syncCatalog(): Promise<IngestItemResult[]> {
    return [
      {
        externalId: 'direct-auth-01',
        title: 'The Last Tide of Padma',
        author: 'Anisur Rahman',
        language: 'bn',
        year: 2021,
        accessType: 'full_book',
        isComplete: true,
        moderationPassed: true,
      },
      {
        externalId: 'direct-auth-02',
        title: 'The Lahore Soliloquy',
        author: 'Tariq Qureshi',
        language: 'ur',
        year: 2020,
        accessType: 'full_book',
        isComplete: true,
        moderationPassed: true,
      },
      {
        externalId: 'direct-auth-03',
        title: 'Chronicles of the Cloud Pavilion',
        author: 'Lin Yuxian',
        language: 'zh',
        year: 2023,
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
    return { authorized: true, reason: 'Direct Author Publishing Agreement signed. Global reading rights active.' };
  }
}
