import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";

export class ReturnFromSubroutineOpcodeHandler extends OpcodeHandler {
  protected handle({ S, PC }: CPU): number {
    const lo = S.pop(); // Pop low byte of PC
    const hi = S.pop(); // Pop high byte of PC

    PC.write((hi << 8) | lo); // Restore PC

    PC.increment();

    return this.cycles;
  }
}
