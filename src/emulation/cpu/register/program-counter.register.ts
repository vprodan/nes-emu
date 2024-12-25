import { wrap16bit } from "@emulation/util/bit-wrapper";
import { BaseRegister } from "./base.register";

export class ProgramCounterRegister extends BaseRegister {
  constructor() {
    super(0x8000);
  }

  public read(): number {
    return wrap16bit(this.value);
  }

  public increment(value: number = 1): void {
    this.value += value;
  }
}
