export class BusError extends Error {
  constructor(message: string) {
    super(`BusError: ${message}`);

    this.name = "BusError";
  }
}
