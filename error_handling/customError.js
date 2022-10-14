export default class CustomError extends Error {
  constructor(statusCode, ...params) {
    super(...params);
    this.statusCode = statusCode;
  }
}
