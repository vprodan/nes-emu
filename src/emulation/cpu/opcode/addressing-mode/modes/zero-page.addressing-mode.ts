import { CPU } from "@emulation/cpu";
import { BaseAddressingMode } from "../base.addressing-mode";
import { wrap8bit } from "@emulation/util/bit-wrapper";
import { ResolvedAddress } from "../resolved-address";

export class ZeroPageAddressingMode extends BaseAddressingMode {
  resolve(cpu: CPU): ResolvedAddress {
    const { ram, PC } = cpu;

    let address = ram.read(PC.read()); // Fetch the base zero-page address

    const register = this.getOperationalRegister(cpu);
    if (register) {
      address = address + register.read();
    }

    PC.increment();

    return { address: wrap8bit(address) };
  }
}
