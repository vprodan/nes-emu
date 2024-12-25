import { CPU } from "@emulation/cpu";
import { ByteRegister } from "@emulation/cpu/register/byte.register";

export enum OperationalRegister {
  A,
  X,
  Y,
}

export abstract class WithOperationalRegister {
  constructor(protected operationalRegister?: OperationalRegister) {}

  protected getOperationalRegister(cpu: CPU): ByteRegister | undefined {
    switch (this.operationalRegister) {
      case OperationalRegister.A:
        return cpu.A;
      case OperationalRegister.X:
        return cpu.X;
      case OperationalRegister.Y:
        return cpu.Y;
    }

    return undefined;
  }
}
