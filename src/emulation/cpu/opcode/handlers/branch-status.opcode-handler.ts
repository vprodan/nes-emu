import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { Status } from "@emulation/cpu/register/status.register";
import { BaseAddressingMode } from "../addressing-mode/base.addressing-mode";
import { wrap8bit } from "@emulation/util/bit-wrapper";

export class BranchStatusOpcodeHandler extends OpcodeHandler {
  constructor(
    protected readonly flag: Status,
    protected readonly status: boolean,
    cycles: number,
    addressingMode?: BaseAddressingMode
  ) {
    super(cycles, addressingMode);
  }

  protected handle(
    { P, PC }: CPU,
    address: number,
    crossedBoundary: boolean
  ): number {
    let isSet = P.isSet(this.flag);

    if (!this.status) {
      isSet = !isSet;
    }

    if (isSet) {
      const offset = wrap8bit(address);
      const signedOffset = offset & 0x80 ? offset - 0x100 : offset;

      const currentPC = PC.read();

      PC.write(currentPC + signedOffset);

      return this.cycles + 1 + (crossedBoundary ? 1 : 0);
    }

    return this.cycles;
  }
}
