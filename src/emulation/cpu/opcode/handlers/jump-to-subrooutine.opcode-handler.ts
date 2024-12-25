import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { wrap8bit } from "@emulation/util/bit-wrapper";

export class JumpToSubroutineOpcodeHandler extends OpcodeHandler {
  protected handle({ PC, S }: CPU, address: number): number {
    const returnAddress = PC.read() - 1;
    const hi = wrap8bit(returnAddress >> 8);
    const lo = wrap8bit(returnAddress);

    S.push(hi);
    S.push(lo);

    PC.write(address!);

    return this.cycles;
  }
}
