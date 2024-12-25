export interface IODevice {
  read(address: number): number;
  write(address: number, value: number): void;
}
