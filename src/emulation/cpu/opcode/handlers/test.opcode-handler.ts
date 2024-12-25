import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { Status } from "@emulation/cpu/register/status.register";
import { wrap8bit } from "@emulation/util/bit-wrapper";
import {
  isNegative,
  isOverflowBit,
  isZero,
} from "@emulation/util/value-checker";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";

export class TestOpcodeHandler extends OpcodeHandler {
  protected handle(cpu: CPU, address: number): number {
    const register = this.getOperationalRegister(cpu);
    if (!register) {
      throw new OperationalRegisterRequiredError();
    }

    const { ram, P } = cpu;

    const value = ram.read(address);
    const result = wrap8bit(register.read() & value);

    P.setAll({
      [Status.Zero]: isZero(result),
      [Status.Negative]: isNegative(value),
      [Status.Overflow]: isOverflowBit(value),
    });

    return this.cycles;
  }
}
