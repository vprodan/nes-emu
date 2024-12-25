import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { Status } from "@emulation/cpu/register/status.register";

export class PullStatusOpcodeHandler extends OpcodeHandler {
  protected handle({ S, P }: CPU): number {
    P.write(S.pop());
    P.clear(Status.Break);

    return this.cycles;
  }
}
