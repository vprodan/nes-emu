import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { Status } from "@emulation/cpu/register/status.register";

export class StatusFlagOpcodeHandler extends OpcodeHandler {
  constructor(
    protected readonly flag: Status,
    protected readonly status: boolean,
    cycles: number
  ) {
    super(cycles);
  }

  protected handle({ P }: CPU): number {
    if (this.status) {
      P.set(this.flag);
    } else {
      P.clear(this.flag);
    }

    return this.cycles;
  }
}
