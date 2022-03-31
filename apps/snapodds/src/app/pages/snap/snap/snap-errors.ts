export class AutoSnapMaxAttemptsReached extends Error {
  constructor() {
    super('Max attempts for auto snapping has been reached');
    this.name = 'AutoSnapMaxAttemptsReached';
  }
}
