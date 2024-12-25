import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";

export class ReturnFromInteruptOpcodeHandler extends OpcodeHandler {
  protected handle({ PC, P, S }: CPU): number {
    P.write(S.pop()); // Restore status flags

    const lo = S.pop(); // Pop low byte of PC
    const hi = S.pop(); // Pop high byte of PC

    PC.write((hi << 8) | lo); // Restore PC

    return this.cycles;
  }
}
