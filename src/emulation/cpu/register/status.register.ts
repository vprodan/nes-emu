import { ByteRegister } from "./byte.register";

export enum Status {
  Carry = 0b0000_0001, // C
  Zero = 0b0000_0010, // Z
  InterruptDisable = 0b0000_0100, // I
  Decimal = 0b0000_1000, // D
  Break = 0b0001_0000, // B
  Unused = 0b0010_0000,
  Overflow = 0b0100_0000, // V
  Negative = 0b1000_0000, // N
}

type StatusSetObject = {
  [key in Status]?: boolean;
};

export class StatusRegister extends ByteRegister {
  constructor() {
    super(Status.Unused);
  }

  set(status: Status): void {
    this.value |= status;
  }

  clear(status: Status): void {
    this.value &= ~status;
  }

  isSet(status: Status): boolean {
    return (this.value & status) !== 0;
  }

  setAll(statuses: StatusSetObject): void {
    Object.entries(statuses).forEach(([status, enabled]) =>
      enabled ? this.set(+status!) : this.clear(+status!)
    );
  }
}
