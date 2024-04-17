export class MissingQueryError extends Error {
  constructor(queryName: string) {
    super(`Missing query: ${queryName}`);
    this.name = "MissingQueryError";
  }
}
