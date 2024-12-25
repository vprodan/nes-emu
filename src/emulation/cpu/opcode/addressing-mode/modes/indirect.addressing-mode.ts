import { CPU } from "@emulation/cpu";
import { BaseAddressingMode } from "../base.addressing-mode";
import { OperationalRegister } from "@emulation/cpu/opcode/operational-register";
import { wrap16bit, wrap8bit } from "@emulation/util/bit-wrapper";
import { ResolvedAddress } from "../resolved-address";
import { checkPageBoundaryCross } from "@emulation/util/check-page-boundary-cross";

export class IndirectAddressingMode extends BaseAddressingMode {
  resolve(cpu: CPU): ResolvedAddress {
    const { ram, PC } = cpu;
    const register = this.getOperationalRegister(cpu);
    if (!register) {
      // JMP (Indirect) requires reading a 16-bit pointer directly from the instruction.
      const lowPointer = ram.read(PC.read());
      PC.increment();
      const highPointer = ram.read(PC.read());
      PC.increment();

      const pointer = (highPointer << 8) | lowPointer;

      // Emulate the 6502 page boundary bug:
      const lo = ram.read(pointer);
      const hi = ram.read((pointer & 0xff00) | ((pointer + 1) & 0x00ff));

      return { address: (hi << 8) | lo };
    }

    let pointer = ram.read(PC.read());
    PC.increment();

    // (zp, X)
    if (this.operationalRegister === OperationalRegister.X) {
      pointer = wrap8bit(pointer + register!.read());
    }

    const lo = ram.read(pointer); // Fetch the low byte of the effective address
    const hi = ram.read(wrap8bit(pointer + 1)); // Fetch the high byte of the effective address (wrap around zero-page)
    let address = (hi << 8) | lo; // Combine high and low bytes into a full effective address
    let crossedBoundary = false;

    // (zp), Y
    if (this.operationalRegister === OperationalRegister.Y) {
      const oldAddress = address;
      address = wrap16bit(address + register!.read());

      if (checkPageBoundaryCross(oldAddress, address)) {
        crossedBoundary = true;
      }
    }

    return { address, crossedBoundary };
  }
}
