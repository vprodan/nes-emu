import { CPU, Status } from "@emulation/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";
import { isNegative, isZero } from "@emulation/util/value-checker";

export class TransferToAccumulatorOpcodeHandler extends OpcodeHandler {
  protected handle(cpu: CPU): number {
    const register = this.getOperationalRegister(cpu);
    if (!register) {
      throw new OperationalRegisterRequiredError();
    }

    const { A, P } = cpu;

    const value = register.read();

    A.write(value);

    P.setAll({
      [Status.Zero]: isZero(value),
      [Status.Negative]: isNegative(value),
    });

    return this.cycles;
  }
}