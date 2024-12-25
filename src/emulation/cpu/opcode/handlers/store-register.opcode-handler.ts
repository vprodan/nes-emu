import { CPU } from "@emulation/cpu";
import { OpcodeHandler } from "../opcode-handler";
import { OperationalRegisterRequiredError } from "@emulation/error/operational-register-required.error";

export class StoreRegisterOpcodeHandler extends OpcodeHandler {
  protected handle(cpu: CPU, address: number): number {
    const register = this.getOperationalRegister(cpu);
    if (!register) {
      throw new OperationalRegisterRequiredError();
    }

    const { ram } = cpu;

    ram.write(address, register.read());

    return this.cycles;
  }
}
