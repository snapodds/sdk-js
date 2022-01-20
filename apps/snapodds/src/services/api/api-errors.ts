export class TvSearchNoResultError extends Error {
  constructor() {
    super('No sport events found');
    this.name = 'TvSearchNoResultError';
  }
}
