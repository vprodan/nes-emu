export class UnknownOpcodeError extends Error {
  constructor(opcode: number, address?: number) {
    const prettyAddress =
      address !== undefined ? `0x${address?.toString(16)}` : "undefined";

    super(
      `UnknownOpcodeError: Attempted to handle ${opcode.toString(
        16
      )} at address ${prettyAddress}. But handler is not found.`
    );

    this.name = "UnknownOpcodeError";
  }
}
