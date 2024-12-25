import { RAM } from "../ram";
import { StatusRegister } from "./register/status.register";
import { ByteRegister } from "./register/byte.register";
import { ProgramCounterRegister } from "./register/program-counter.register";
import { StackRegister } from "./register/stack.register";
import { OpcodeHandlerRepository } from "./opcode";

/** 6502 CPU */
export class CPU {
  public readonly A = new ByteRegister();
  public readonly X = new ByteRegister();
  public readonly Y = new ByteRegister();
  public readonly PC = new ProgramCounterRegister();
  public readonly S = new StackRegister(this.ram);
  public readonly P = new StatusRegister();

  constructor(public readonly ram: RAM) {}

  public reset(): void {
    this.A.reset();
    this.X.reset();
    this.Y.reset();
    this.resetPC();
    this.S.reset();
    this.P.reset();
  }

  protected step() {
    const opcode = this.fetch();
    const handler = OpcodeHandlerRepository.get(opcode);

    const cycles = handler.invoke(this);
  }

  protected fetch(): number {
    const opcode = this.ram.read(this.PC.read());
    this.PC.increment();

    return opcode;
  }

  protected resetPC(): void {
    this.PC.write((this.ram.read(0xfffd) << 8) | this.ram.read(0xfffc));
  }
}
