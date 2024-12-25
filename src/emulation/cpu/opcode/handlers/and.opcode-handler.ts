import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";
import { wrap8bit } from "@emulation/util/bit-wrapper";
import { Status } from "@emulation/cpu/register/status.register";
import { isNegative, isZero } from "@emulation/util/value-checker";

export class AndOpcodeHandler extends OpcodeHandler {
  protected handle(
    cpu: CPU,
    address: number,
    crossedBoundary: boolean
  ): number {
    const register = this.getOperationalRegister(cpu);
    if (!register) {
      throw new OperationalRegisterRequiredError();
    }

    const { ram, P } = cpu;

    const result = wrap8bit(register.read() & ram.read(address));
    register.write(result);

    P.setAll({
      [Status.Zero]: isZero(result),
      [Status.Negative]: isNegative(result),
    });

    return this.cycles + (crossedBoundary ? 1 : 0);
  }
}
