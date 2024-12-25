import { CPU } from "@emulation/cpu";
import { WithOperationalRegister } from "../operational-register";
import { ResolvedAddress } from "./resolved-address";

export abstract class BaseAddressingMode {
  /**
   * Address Resolver
   * @param cpu CPU instance
   */
  public abstract resolve(cpu: CPU): ResolvedAddress;
}
