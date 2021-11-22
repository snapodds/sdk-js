export class SnapOddsNoResultError extends Error {
  constructor() {
    super('No sport events found');
    this.name = 'SnapOddsNoResultError';
  }
}
