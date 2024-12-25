import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { wrap8bit } from "@emulation/util/bit-wrapper";
import { Status } from "@emulation/cpu/register/status.register";

export class BreakOpcodeHandler extends OpcodeHandler {
  protected handle({ ram, PC, S, P }: CPU): number {
    PC.increment(); // Increment PC past the BRK instruction

    S.push(wrap8bit(PC.read() >> 8)); // Push high byte of PC
    S.push(wrap8bit(PC.read())); // Push low byte of PC
    S.push(P.read() | Status.Break); // Push status flags with Break flag set

    const lo = ram.read(0xfffe); // Low byte of interrupt vector
    const hi = ram.read(0xffff); // High byte of interrupt vector

    PC.write((hi << 8) | lo); // Set PC to interrupt vector

    return this.cycles;
  }
}
