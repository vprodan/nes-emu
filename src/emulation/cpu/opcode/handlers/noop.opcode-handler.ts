import { OpcodeHandler } from "../opcode-handler";

export class NoopOpcodeHandler extends OpcodeHandler {
  protected handle(): number {
    return this.cycles;
  }
}
