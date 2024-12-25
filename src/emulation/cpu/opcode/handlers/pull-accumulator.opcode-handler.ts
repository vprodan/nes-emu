import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { Status } from "@emulation/cpu/register/status.register";
import { isNegative, isZero } from "@emulation/util/value-checker";
import { wrap8bit } from "@emulation/util/bit-wrapper";

export class PullAccumulatorOpcodeHandler extends OpcodeHandler {
  protected handle({ S, P, A }: CPU): number {
    const value = wrap8bit(S.pop());
    A.write(value);

    P.setAll({
      [Status.Zero]: isZero(value),
      [Status.Negative]: isNegative(value),
    });

    return this.cycles;
  }
}
