import { IODevice } from "./io-device";
import { wrap8bit } from "./util/bit-wrapper";

export class RAM implements IODevice {
  private readonly memory = new Uint8Array(0x0800); // 2 KB

  read(address: number): number {
    address = this.mirrorMask(address);

    return this.memory[address];
  }

  write(address: number, value: number): void {
    address = this.mirrorMask(address);

    this.memory[address] = wrap8bit(value);
  }

  private mirrorMask(address: number): number {
    return address & 0x07ff;
  }
}
