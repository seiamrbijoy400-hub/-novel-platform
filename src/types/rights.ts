export type LicenseType =
  | 'wholesale_b2b'
  | 'agency_revshare'
  | 'direct_author_exclusive'
  | 'direct_author_nonexclusive'
  | 'creative_commons'
  | 'public_domain';

export interface BookLicense {
  id: string;
  bookId: string;
  providerId: string;
  licenseType: LicenseType;
  rightsHolder: string;
  canReadFullBook: boolean;
  canStreamHtml: boolean;
  worldwideRights: boolean;
  allowedTerritories: string[]; // ISO 3166-1 alpha-2 e.g. ['US', 'IN', 'BD', 'GB', 'GLOBAL']
  restrictedTerritories: string[];
  licenseStartDate: string;
  licenseEndDate?: string;
  isExpired: boolean;
  isRevoked: boolean;
}

export interface EntitlementCheckResult {
  allowed: boolean;
  reasonCode: 'AUTHORIZED' | 'EXPIRED_LICENSE' | 'TERRITORY_RESTRICTED' | 'PREVIEW_ONLY' | 'REVOKED' | 'NOT_FOUND';
  message: string;
  readableChapters: number;
}
