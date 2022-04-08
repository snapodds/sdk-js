/**
 * Error to indicate that a search has returned no results
 */
export class TvSearchNoResultError extends Error {
  constructor(readonly requestUuid: string = '') {
    super('No sport events found');
    this.name = 'TvSearchNoResultError';
  }
}
