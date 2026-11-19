import { Book } from '../types/book';
import { EntitlementCheckResult } from '../types/rights';

export class RightsEngine {
  /**
   * Verifies if a user in a specific territory is legally entitled to read the complete book
   */
  public static verifyEntitlement(book: Book, userCountryCode: string = 'US'): EntitlementCheckResult {
    // 1. Check if book is flagged or restricted by moderation
    if (book.isAdultRestricted || book.moderationStatus === 'quarantined' || book.moderationStatus === 'rejected') {
      return {
        allowed: false,
        reasonCode: 'REVOKED',
        message: 'This title is currently unavailable due to content policy compliance or copyright review.',
        readableChapters: 0,
      };
    }

    // 2. Check preview-only status
    if (book.accessType === 'preview_only') {
      return {
        allowed: false,
        reasonCode: 'PREVIEW_ONLY',
        message: 'This title is an authorized publisher preview. Full-book streaming is not currently licensed for this edition.',
        readableChapters: book.chapters?.length || 1,
      };
    }

    // 3. Metadata only
    if (book.accessType === 'metadata_only') {
      return {
        allowed: false,
        reasonCode: 'NOT_FOUND',
        message: 'This title is cataloged for discovery only. Full text is not licensed on this platform.',
        readableChapters: 0,
      };
    }

    // 4. Check territory restrictions
    const isGlobal = book.allowedTerritories.includes('GLOBAL');
    const matchesTerritory = isGlobal || book.allowedTerritories.includes(userCountryCode.toUpperCase());

    if (!matchesTerritory) {
      return {
        allowed: false,
        reasonCode: 'TERRITORY_RESTRICTED',
        message: `Reading rights for this title are restricted in your territory (${userCountryCode.toUpperCase()}) by the copyright holder.`,
        readableChapters: 0,
      };
    }

    // 5. Full authorization granted
    return {
      allowed: true,
      reasonCode: 'AUTHORIZED',
      message: 'Full book access verified and authorized by rights holder.',
      readableChapters: book.chapters?.length || 0,
    };
  }
}
