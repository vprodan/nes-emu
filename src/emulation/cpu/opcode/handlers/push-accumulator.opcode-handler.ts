import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";

export class PushAccumulatorOpcodeHandler extends OpcodeHandler {
  protected handle({ S, A }: CPU): number {
    S.push(A.read());

    return this.cycles;
  }
}
