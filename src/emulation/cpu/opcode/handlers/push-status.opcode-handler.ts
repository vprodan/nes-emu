import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { Status } from "@emulation/cpu/register/status.register";

export class PushStatusOpcodeHandler extends OpcodeHandler {
  protected handle({ S, P }: CPU): number {
    S.push(P.read() | Status.Break | Status.Unused);

    return this.cycles;
  }
}
