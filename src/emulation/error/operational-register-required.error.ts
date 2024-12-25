export class OperationalRegisterRequiredError extends Error {
  constructor() {
    super("OperationalRegisterRequiredError: Operational register is required");

    this.name = "OperationalRegisterRequiredError";
  }
}
