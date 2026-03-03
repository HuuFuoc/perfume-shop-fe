export class HttpException extends Error {
  public status: number;
  public error?: string;

  constructor(message: string, status: number, error?: string) {
    super(message);
    this.status = status;
    this.error = error;
  }
}
