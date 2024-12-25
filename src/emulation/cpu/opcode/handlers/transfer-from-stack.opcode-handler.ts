import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";
import { Status } from "@emulation/cpu/register/status.register";
import { isNegative, isZero } from "@emulation/util/value-checker";

export class TransferFromStackOpcodeHandler extends OpcodeHandler {
  protected handle(cpu: CPU): number {
    const register = this.getOperationalRegister(cpu);
    if (!register) {
      throw new OperationalRegisterRequiredError();
    }

    const { S, P } = cpu;

    const value = S.read();

    register.write(value);

    P.setAll({
      [Status.Zero]: isZero(value),
      [Status.Negative]: isNegative(value),
    });

    return this.cycles;
  }
}
