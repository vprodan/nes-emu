import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { wrap8bit } from "@emulation/util/bit-wrapper";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";
import { Status } from "@emulation/cpu/register/status.register";
import { isNegative, isZero } from "@emulation/util/value-checker";

export class IncrementOpcodeHandler extends OpcodeHandler {
  protected handle(cpu: CPU, address?: number): number {
    const { ram, P } = cpu;

    const register = this.getOperationalRegister(cpu);

    let value: number;
    if (address) {
      value = ram.read(address);
    } else {
      if (!register) {
        throw new OperationalRegisterRequiredError();
      }

      value = register.read();
    }

    value = wrap8bit(value + 1);
    if (address) {
      ram.write(address, value);
    }

    if (register) {
      register.write(value);
    }

    P.setAll({
      [Status.Zero]: isZero(value),
      [Status.Negative]: isNegative(value),
    });

    return this.cycles;
  }
}
