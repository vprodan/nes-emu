import { CPU } from "@emulation/cpu";
import { BaseAddressingMode } from "../base.addressing-mode";
import { ResolvedAddress } from "../resolved-address";

export class ImmediateAddressingMode extends BaseAddressingMode {
  resolve({ ram, PC }: CPU): ResolvedAddress {
    const address = ram.read(PC.read());

    PC.increment(1);

    return { address };
  }
}
