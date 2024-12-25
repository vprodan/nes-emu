import { IODevice } from "./io-device";

export class APU implements IODevice {
  read(address: number): number {
    throw new Error("Method not implemented.");
  }
  write(address: number, value: number): void {
    throw new Error("Method not implemented.");
  }
}
