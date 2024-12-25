import { CPU } from "@emulation/cpu";
import { BaseAddressingMode } from "./addressing-mode/base.addressing-mode";
import {
  OperationalRegister,
  WithOperationalRegister,
} from "./operational-register";

export abstract class OpcodeHandler extends WithOperationalRegister {
  constructor(
    protected readonly cycles: number,
    protected readonly addressingMode?: BaseAddressingMode,
    operationalRegister?: OperationalRegister
  ) {
    super(operationalRegister);
  }

  /**
   * Invokes the opcode.
   * Resolves the value using the addressing mode if provided, or skips it for implied instructions.
   * @param cpu The CPU instance.
   * @returns Cycles count
   */
  invoke(cpu: CPU): number {
    const resolved = this.addressingMode
      ? this.addressingMode.resolve(cpu)
      : undefined;

    return this.handle(
      cpu,
      resolved?.address,
      resolved?.crossedBoundary ?? false
    );
  }

  /**
   * Performs the operation defined by the opcode.
   * @param cpu - The CPU instance.
   * @param address - The resolved address (optional for implied instructions - no addressingMode).
   * @param cycles - Additional cycles.
   * @returns Cycles count
   */
  protected abstract handle(
    cpu: CPU,
    address?: number,
    crossedBoundary?: boolean
  ): number;
}
