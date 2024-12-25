export class OpcodeHandlerNoResolvedValueError extends Error {
  constructor(opcodeName: string, address: number) {
    super(
      `OpcodeHandlerNoResolvedValueError: Attempted to handle ${opcodeName} at address 0x${address.toString(
        16
      )}. It requires a resolved value, but undefined was provided.`
    );

    this.name = "OpcodeHandlerNoResolvedValueError";
  }
}
