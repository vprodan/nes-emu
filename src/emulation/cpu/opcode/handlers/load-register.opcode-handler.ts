import { CPU, Status } from "@emulation/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";
import { isNegative, isZero } from "@emulation/util/value-checker";

export class LoadRegisterOpcodeHandler extends OpcodeHandler {
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

    const value = ram.read(address);

    register.write(value);

    P.setAll({
      [Status.Zero]: isZero(value),
      [Status.Negative]: isNegative(value),
    });

    return this.cycles + (crossedBoundary ? 1 : 0);
  }
}
