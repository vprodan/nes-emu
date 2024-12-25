import { CPU } from "@emulation/cpu/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";

export class TransferToStackOpcodeHandler extends OpcodeHandler {
  protected handle(cpu: CPU): number {
    const register = this.getOperationalRegister(cpu);
    if (!register) {
      throw new OperationalRegisterRequiredError();
    }

    const { S } = cpu;

    const value = register.read();

    S.write(value);

    return this.cycles;
  }
}
