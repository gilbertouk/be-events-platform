export class InvalidQueryError extends Error {
  constructor(queryName: string) {
    super(`Invalid query: ${queryName}`);
    this.name = "InvalidQueryError";
  }
}
