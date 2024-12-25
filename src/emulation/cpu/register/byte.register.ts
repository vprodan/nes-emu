import { wrap8bit } from "@emulation/util/bit-wrapper";
import { BaseRegister } from "./base.register";

export class ByteRegister extends BaseRegister {
  public read(): number {
    return wrap8bit(this.value);
  }
}
