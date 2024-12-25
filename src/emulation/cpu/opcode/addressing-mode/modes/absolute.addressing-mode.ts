import { CPU } from "@emulation/cpu";
import { BaseAddressingMode } from "../base.addressing-mode";
import { wrap16bit } from "@emulation/util/bit-wrapper";
import { ResolvedAddress } from "../resolved-address";
import { checkPageBoundaryCross } from "@emulation/util/check-page-boundary-cross";

export class AbsoluteAddressingMode extends BaseAddressingMode {
  resolve(cpu: CPU): ResolvedAddress {
    const { ram, PC } = cpu;
    const lo = ram.read(PC.read()); // Fetch the low byte of the address
    const hi = ram.read(PC.read() + 1); // Fetch the high byte of the address
    let address = (hi << 8) | lo; // Combine high and low bytes into a full address
    let crossedBoundary = false;

    const register = this.getOperationalRegister(cpu);
    if (register) {
      const oldAddress = address;
      address = wrap16bit(address + register.read());

      if (checkPageBoundaryCross(oldAddress, address)) {
        crossedBoundary = true;
      }
    }

    PC.increment(2);

    return {
      address,
      crossedBoundary,
    };
  }
}
