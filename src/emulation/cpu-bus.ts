import { APU } from "./apu";
import { BusError } from "./error/bus-error";
import { IODevice } from "./io-device";
import { Cartridge } from "./cartridge";
import { PPU } from "./ppu";
import { RAM } from "./ram";

export class CPUBus implements IODevice {
  constructor(
    private readonly ram: RAM,
    private readonly ppu: PPU,
    private readonly apu: APU,
    private readonly input: any,
    private readonly cartridge: Cartridge
  ) {}

  public read(address: number): number {}

  public write(address: number, value: number): void {}

  private getDevice(address: number): IODevice {
    if (address < 0x2000) {
      return this.ram;
    } else if (address < 0x4000) {
      return this.ppu;
    } else if (address < 0x4018) {
      if (address < 0x4016) {
        return this.apu;
      }

      return this.input;
    } else if (address > 0x401f) {
      return this.cartridge;
    }

    throw new BusError(`Unknown device for 0x${address.toString(16)}`);
  }
}
