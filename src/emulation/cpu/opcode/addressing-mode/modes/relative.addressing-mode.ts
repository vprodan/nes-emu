import { CPU } from "@emulation/cpu";
import { wrap16bit } from "@emulation/util/bit-wrapper";
import { BaseAddressingMode } from "../base.addressing-mode";
import { ResolvedAddress } from "../resolved-address";
import { checkPageBoundaryCross } from "@emulation/util/check-page-boundary-cross";

export class RelativeAddressingMode extends BaseAddressingMode {
  resolve({ ram, PC }: CPU): ResolvedAddress {
    const offset = ram.read(PC.read()); // Fetch the signed offset
    const signedOffset = offset > 127 ? offset - 256 : offset; // Convert the offset to a signed 8-bit value

    PC.increment();

    let crossedBoundary = false;
    let address = PC.read();
    const oldAddress = address;

    address = wrap16bit(address + signedOffset);

    if (checkPageBoundaryCross(oldAddress, address)) {
      crossedBoundary = true;
    }

    return { address, crossedBoundary };
  }
}
