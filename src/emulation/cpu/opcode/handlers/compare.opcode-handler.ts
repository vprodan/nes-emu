import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { Status } from "@emulation/cpu/register/status.register";
import {
  isCarryCompare,
  isNegative,
  isZero,
} from "@emulation/util/value-checker";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";

export class CompareOpcodeHandler extends OpcodeHandler {
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

    const result = register.read() - ram.read(address);

    P.setAll({
      [Status.Carry]: isCarryCompare(result),
      [Status.Zero]: isZero(result),
      [Status.Negative]: isNegative(result),
    });

    return this.cycles + (crossedBoundary ? 1 : 0);
  }
}
