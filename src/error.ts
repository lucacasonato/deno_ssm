export class SSMError extends Error {
  name = "SSMError";
  constructor(message: string, public response: string) {
    super(message);
  }
}
