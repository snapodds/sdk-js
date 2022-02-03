/**
 * Error to indicate that a search has returned no results
 */
export class TvSearchNoResultError extends Error {
  constructor() {
    super('No sport events found');
    this.name = 'TvSearchNoResultError';
  }
}
