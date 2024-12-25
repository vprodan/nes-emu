import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { Status } from "@emulation/cpu/register/status.register";
import { wrap8bit } from "@emulation/util/bit-wrapper";
import {
  isCarryAdd,
  isNegative,
  isOverflowArith,
  isZero,
} from "@emulation/util/value-checker";

export class AddOpcodeHandler extends OpcodeHandler {
  protected handle(
    { ram, A, P }: CPU,
    address: number,
    crossedBoundary: boolean
  ): number {
    const c = P.isSet(Status.Carry) ? 1 : 0;
    const a = A.read();
    const b = ram.read(address);
    const result = a + b + c;
    const wrappedResult = wrap8bit(result);

    A.write(wrappedResult);
    P.setAll({
      [Status.Zero]: isZero(wrappedResult),
      [Status.Negative]: isNegative(wrappedResult),
      [Status.Carry]: isCarryAdd(result),
      [Status.Overflow]: isOverflowArith(a, b, result),
    });

    return this.cycles + (crossedBoundary ? 1 : 0);
  }
}
