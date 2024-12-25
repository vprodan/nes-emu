import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";

export class JumpOpcodeHandler extends OpcodeHandler {
  protected handle({ PC }: CPU, address: number): number {
    PC.write(address);

    return this.cycles;
  }
}
