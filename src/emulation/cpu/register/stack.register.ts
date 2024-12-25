import { RAM } from "@emulation/ram";
import { ByteRegister } from "./byte.register";
import { wrap8bit } from "@emulation/util/bit-wrapper";

export class StackRegister extends ByteRegister {
  constructor(private readonly ram: RAM) {
    super(0xfd);
  }

  public push(value: number): void {
    const address = 0x0100 + wrap8bit(this.read()); // Calculate stack address
    this.ram.write(address, wrap8bit(value)); // Ensure value is 8-bit
    this.write(wrap8bit(this.read() - 1)); // Decrement SP and wrap around within 8 bits
  }

  public pop(): number {
    this.write(wrap8bit(this.read() + 1)); // Increment SP and wrap around within 8 bits
    const address = 0x0100 + wrap8bit(this.read()); // Calculate stack address

    return this.ram.read(address); // Read and return the value from the stack
  }
}
