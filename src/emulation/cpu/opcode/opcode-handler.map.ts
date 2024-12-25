import { Status } from "../register/status.register";
import { AddressingMode, AddressingModeMap } from "./addressing-mode";
import { AddOpcodeHandler } from "./handlers/add.opcode-handler";
import { AndOpcodeHandler } from "./handlers/and.opcode-handler";
import { BranchStatusOpcodeHandler } from "./handlers/branch-status.opcode-handler";
import { BreakOpcodeHandler } from "./handlers/break.opcode-handler";
import { CompareOpcodeHandler } from "./handlers/compare.opcode-handler";
import { DecrementOpcodeHandler } from "./handlers/decrement.opcode-handler";
import { IncrementOpcodeHandler } from "./handlers/increment.opcode-handler";
import { JumpToSubroutineOpcodeHandler } from "./handlers/jump-to-subrooutine.opcode-handler";
import { JumpOpcodeHandler } from "./handlers/jump.opcode-handler";
import { LoadRegisterOpcodeHandler } from "./handlers/load-register.opcode-handler";
import { NoopOpcodeHandler } from "./handlers/noop.opcode-handler";
import { OrOpcodeHandler } from "./handlers/or.opcode-handler";
import { PullAccumulatorOpcodeHandler } from "./handlers/pull-accumulator.opcode-handler";
import { PullStatusOpcodeHandler } from "./handlers/pull-status.opcode-handler";
import { PushAccumulatorOpcodeHandler } from "./handlers/push-accumulator.opcode-handler";
import { PushStatusOpcodeHandler } from "./handlers/push-status.opcode-handler";
import { ReturnFromInteruptOpcodeHandler } from "./handlers/return-from-interupt.opcode-handler";
import { ReturnFromSubroutineOpcodeHandler } from "./handlers/return-from-subroutine.opcode-handler";
import { RotateLeftOpcodeHandler } from "./handlers/rotate-left.opcode-handler";
import { RotateRightOpcodeHandler } from "./handlers/rotate-right.opcode-handler";
import { ShiftLeftOpcodeHandler } from "./handlers/shift-left.opcode-handler";
import { ShiftRightOpcodeHandler } from "./handlers/shift-right.opcode-handler";
import { StatusFlagOpcodeHandler } from "./handlers/status-flag.opcode-handler";
import { StoreRegisterOpcodeHandler } from "./handlers/store-register.opcode-handler";
import { SubstractOpcodeHandler } from "./handlers/subtract.opcode-handler";
import { TestOpcodeHandler } from "./handlers/test.opcode-handler";
import { TransferFromAccumulatorOpcodeHandler } from "./handlers/transfer-from-accumulator.opcode-handler";
import { TransferFromStackOpcodeHandler } from "./handlers/transfer-from-stack.opcode-handler";
import { TransferToAccumulatorOpcodeHandler } from "./handlers/transfer-to-accumulator.opcode-handler";
import { TransferToStackOpcodeHandler } from "./handlers/transfer-to-stack.opcode-handler";
import { XorOpcodeHandler } from "./handlers/xor.opcode-handler";
import { OpcodeHandler } from "./opcode-handler";
import { OperationalRegister } from "./operational-register";

const Absolute = AddressingModeMap.get(AddressingMode.Absolute);
const AbsoluteX = AddressingModeMap.get(AddressingMode.AbsoluteX);
const AbsoluteY = AddressingModeMap.get(AddressingMode.AbsoluteY);
const Immediate = AddressingModeMap.get(AddressingMode.Immediate);
const Indirect = AddressingModeMap.get(AddressingMode.Indirect);
const IndirectX = AddressingModeMap.get(AddressingMode.IndirectX);
const IndirectY = AddressingModeMap.get(AddressingMode.IndirectY);
const Relative = AddressingModeMap.get(AddressingMode.Relative);
const ZeroPage = AddressingModeMap.get(AddressingMode.ZeroPage);
const ZeroPageX = AddressingModeMap.get(AddressingMode.ZeroPageX);
const ZeroPageY = AddressingModeMap.get(AddressingMode.ZeroPageY);

const { A, X, Y } = OperationalRegister;

export const OpcodeHandlerMap: ReadonlyMap<number, OpcodeHandler> = new Map<
  number,
  OpcodeHandler
>([
  // LDA
  [0xa9, new LoadRegisterOpcodeHandler(2, Immediate, A)],
  [0xa5, new LoadRegisterOpcodeHandler(3, ZeroPage, A)],
  [0xb5, new LoadRegisterOpcodeHandler(4, ZeroPageX, A)],
  [0xad, new LoadRegisterOpcodeHandler(4, Absolute, A)],
  [0xbd, new LoadRegisterOpcodeHandler(4, AbsoluteX, A)],
  [0xb9, new LoadRegisterOpcodeHandler(4, AbsoluteY, A)],
  [0xa1, new LoadRegisterOpcodeHandler(6, IndirectX, A)],
  [0xb1, new LoadRegisterOpcodeHandler(5, IndirectY, A)],
  // LDX
  [0xa2, new LoadRegisterOpcodeHandler(2, Immediate, X)],
  [0xa6, new LoadRegisterOpcodeHandler(3, ZeroPage, X)],
  [0xb6, new LoadRegisterOpcodeHandler(4, ZeroPageY, X)],
  [0xae, new LoadRegisterOpcodeHandler(4, Absolute, X)],
  [0xbe, new LoadRegisterOpcodeHandler(4, AbsoluteY, X)],
  // LDY
  [0xa2, new LoadRegisterOpcodeHandler(2, Immediate, Y)],
  [0xa6, new LoadRegisterOpcodeHandler(3, ZeroPage, Y)],
  [0xb6, new LoadRegisterOpcodeHandler(4, ZeroPageX, Y)],
  [0xae, new LoadRegisterOpcodeHandler(4, Absolute, Y)],
  [0xbe, new LoadRegisterOpcodeHandler(4, AbsoluteX, Y)],
  // STA
  [0x85, new StoreRegisterOpcodeHandler(3, ZeroPage, A)],
  [0x95, new StoreRegisterOpcodeHandler(4, ZeroPageX, A)],
  [0x8d, new StoreRegisterOpcodeHandler(4, Absolute, A)],
  [0x9d, new StoreRegisterOpcodeHandler(5, AbsoluteX, A)],
  [0x99, new StoreRegisterOpcodeHandler(5, AbsoluteY, A)],
  [0x81, new StoreRegisterOpcodeHandler(6, IndirectX, A)],
  [0x91, new StoreRegisterOpcodeHandler(6, IndirectY, A)],
  // STX
  [0x86, new StoreRegisterOpcodeHandler(3, ZeroPage, X)],
  [0x96, new StoreRegisterOpcodeHandler(4, ZeroPageY, X)],
  [0x8e, new StoreRegisterOpcodeHandler(4, Absolute, X)],
  // STY
  [0x84, new StoreRegisterOpcodeHandler(3, ZeroPage, Y)],
  [0x94, new StoreRegisterOpcodeHandler(4, ZeroPageX, Y)],
  [0x8c, new StoreRegisterOpcodeHandler(4, Absolute, Y)],
  // TAX
  [0xaa, new TransferFromAccumulatorOpcodeHandler(2, undefined, X)],
  // TAY
  [0xa8, new TransferFromAccumulatorOpcodeHandler(2, undefined, Y)],
  // TXA
  [0x8a, new TransferToAccumulatorOpcodeHandler(2, undefined, X)],
  // TYA
  [0x98, new TransferToAccumulatorOpcodeHandler(2, undefined, Y)],
  // ADC
  [0x69, new AddOpcodeHandler(2, Immediate)],
  [0x65, new AddOpcodeHandler(3, ZeroPage)],
  [0x75, new AddOpcodeHandler(4, ZeroPageX)],
  [0x6d, new AddOpcodeHandler(4, Absolute)],
  [0x7d, new AddOpcodeHandler(4, AbsoluteX)],
  [0x79, new AddOpcodeHandler(4, AbsoluteY)],
  [0x61, new AddOpcodeHandler(6, IndirectX)],
  [0x71, new AddOpcodeHandler(5, IndirectY)],
  // SBC
  [0xe9, new SubstractOpcodeHandler(2, Immediate)],
  [0xe5, new SubstractOpcodeHandler(3, ZeroPage)],
  [0xf5, new SubstractOpcodeHandler(4, ZeroPageX)],
  [0xed, new SubstractOpcodeHandler(4, Absolute)],
  [0xfd, new SubstractOpcodeHandler(4, AbsoluteX)],
  [0xf9, new SubstractOpcodeHandler(4, AbsoluteY)],
  [0xe1, new SubstractOpcodeHandler(6, IndirectX)],
  [0xf1, new SubstractOpcodeHandler(5, IndirectY)],
  // INC
  [0xe6, new IncrementOpcodeHandler(5, ZeroPage)],
  [0xf6, new IncrementOpcodeHandler(6, ZeroPageX)],
  [0xee, new IncrementOpcodeHandler(6, Absolute)],
  [0xfe, new IncrementOpcodeHandler(7, AbsoluteX)],
  // INX
  [0xe8, new IncrementOpcodeHandler(2, undefined, X)],
  // INY
  [0xc8, new IncrementOpcodeHandler(2, undefined, Y)],
  // DEC
  [0xc6, new DecrementOpcodeHandler(5, ZeroPage)],
  [0xd6, new DecrementOpcodeHandler(6, ZeroPageX)],
  [0xce, new DecrementOpcodeHandler(6, Absolute)],
  [0xde, new DecrementOpcodeHandler(7, AbsoluteX)],
  // DEX
  [0xca, new DecrementOpcodeHandler(2, undefined, X)],
  // DEY
  [0x88, new DecrementOpcodeHandler(2, undefined, Y)],
  // ASL
  [0x0a, new ShiftLeftOpcodeHandler(2, undefined, A)],
  [0x06, new ShiftLeftOpcodeHandler(5, ZeroPage)],
  [0x16, new ShiftLeftOpcodeHandler(6, ZeroPageX)],
  [0x0e, new ShiftLeftOpcodeHandler(6, Absolute)],
  [0x1e, new ShiftLeftOpcodeHandler(7, AbsoluteX)],
  // LSR
  [0x4a, new ShiftRightOpcodeHandler(2, undefined, A)],
  [0x46, new ShiftRightOpcodeHandler(5, ZeroPage)],
  [0x56, new ShiftRightOpcodeHandler(6, ZeroPageX)],
  [0x4e, new ShiftRightOpcodeHandler(6, Absolute)],
  [0x5e, new ShiftRightOpcodeHandler(7, AbsoluteX)],
  // ROL
  [0x2a, new RotateLeftOpcodeHandler(2, undefined, A)],
  [0x26, new RotateLeftOpcodeHandler(5, ZeroPage)],
  [0x36, new RotateLeftOpcodeHandler(6, ZeroPageX)],
  [0x2e, new RotateLeftOpcodeHandler(6, Absolute)],
  [0x3e, new RotateLeftOpcodeHandler(7, AbsoluteX)],
  // ROR
  [0x6a, new RotateRightOpcodeHandler(2, undefined, A)],
  [0x66, new RotateRightOpcodeHandler(5, ZeroPage)],
  [0x76, new RotateRightOpcodeHandler(6, ZeroPageX)],
  [0x6e, new RotateRightOpcodeHandler(6, Absolute)],
  [0x7e, new RotateRightOpcodeHandler(7, AbsoluteX)],
  // AND
  [0x29, new AndOpcodeHandler(2, Immediate, A)],
  [0x25, new AndOpcodeHandler(3, ZeroPage, A)],
  [0x35, new AndOpcodeHandler(4, ZeroPageX, A)],
  [0x2d, new AndOpcodeHandler(4, Absolute, A)],
  [0x3d, new AndOpcodeHandler(4, AbsoluteX, A)],
  [0x39, new AndOpcodeHandler(4, AbsoluteY, A)],
  [0x21, new AndOpcodeHandler(6, IndirectX, A)],
  [0x31, new AndOpcodeHandler(5, IndirectY, A)],
  // ORA
  [0x09, new OrOpcodeHandler(2, Immediate, A)],
  [0x05, new OrOpcodeHandler(3, ZeroPage, A)],
  [0x15, new OrOpcodeHandler(4, ZeroPageX, A)],
  [0x0d, new OrOpcodeHandler(4, Absolute, A)],
  [0x1d, new OrOpcodeHandler(4, AbsoluteX, A)],
  [0x19, new OrOpcodeHandler(4, AbsoluteY, A)],
  [0x01, new OrOpcodeHandler(6, IndirectX, A)],
  [0x11, new OrOpcodeHandler(5, IndirectY, A)],
  // EOR
  [0x49, new XorOpcodeHandler(2, Immediate, A)],
  [0x45, new XorOpcodeHandler(3, ZeroPage, A)],
  [0x55, new XorOpcodeHandler(4, ZeroPageX, A)],
  [0x4d, new XorOpcodeHandler(4, Absolute, A)],
  [0x5d, new XorOpcodeHandler(4, AbsoluteX, A)],
  [0x59, new XorOpcodeHandler(4, AbsoluteY, A)],
  [0x41, new XorOpcodeHandler(6, IndirectX, A)],
  [0x51, new XorOpcodeHandler(5, IndirectY, A)],
  // BIT
  [0x24, new TestOpcodeHandler(3, ZeroPage, A)],
  [0x2c, new TestOpcodeHandler(4, Absolute, A)],
  // CMP
  [0xc9, new CompareOpcodeHandler(2, Immediate, A)],
  [0xc5, new CompareOpcodeHandler(3, ZeroPage, A)],
  [0xd5, new CompareOpcodeHandler(4, ZeroPageX, A)],
  [0xcd, new CompareOpcodeHandler(4, Absolute, A)],
  [0xdd, new CompareOpcodeHandler(4, AbsoluteX, A)],
  [0xd9, new CompareOpcodeHandler(4, AbsoluteY, A)],
  [0xc1, new CompareOpcodeHandler(6, IndirectX, A)],
  [0xd1, new CompareOpcodeHandler(5, IndirectY, A)],
  // CPX
  [0xe0, new CompareOpcodeHandler(2, Immediate, X)],
  [0xe4, new CompareOpcodeHandler(3, ZeroPage, X)],
  [0xec, new CompareOpcodeHandler(4, Absolute, X)],
  // CPY
  [0xc0, new CompareOpcodeHandler(2, Immediate, Y)],
  [0xc4, new CompareOpcodeHandler(3, ZeroPage, Y)],
  [0xcc, new CompareOpcodeHandler(4, Absolute, Y)],
  // BCC
  [0x90, new BranchStatusOpcodeHandler(Status.Carry, false, 2, Relative)],
  // BCS
  [0xb0, new BranchStatusOpcodeHandler(Status.Carry, true, 2, Relative)],
  // BEQ
  [0xf0, new BranchStatusOpcodeHandler(Status.Zero, true, 2, Relative)],
  // BNE
  [0xd0, new BranchStatusOpcodeHandler(Status.Zero, false, 2, Relative)],
  // BMI
  [0x30, new BranchStatusOpcodeHandler(Status.Negative, true, 2, Relative)],
  // BPL
  [0x10, new BranchStatusOpcodeHandler(Status.Negative, false, 2, Relative)],
  // BVC
  [0x50, new BranchStatusOpcodeHandler(Status.Overflow, false, 2, Relative)],
  // BVS
  [0x70, new BranchStatusOpcodeHandler(Status.Overflow, true, 2, Relative)],
  // JMP
  [0x4c, new JumpOpcodeHandler(3, Absolute)],
  [0x6c, new JumpOpcodeHandler(5, Indirect)],
  // JSR
  [0x20, new JumpToSubroutineOpcodeHandler(6, Absolute)],
  // BRK
  [0x00, new BreakOpcodeHandler(7)],
  // RTI
  [0x40, new ReturnFromInteruptOpcodeHandler(6)],
  // RTS
  [0x60, new ReturnFromSubroutineOpcodeHandler(6)],
  // PHA
  [0x48, new PushAccumulatorOpcodeHandler(3)],
  // PHP
  [0x08, new PushStatusOpcodeHandler(3)],
  // PLA
  [0x68, new PullAccumulatorOpcodeHandler(4)],
  // PLP
  [0x28, new PullStatusOpcodeHandler(4)],
  // TXS
  [0x9a, new TransferToStackOpcodeHandler(2, undefined, X)],
  // TSX
  [0xba, new TransferFromStackOpcodeHandler(2, undefined, X)],
  // CLC
  [0x18, new StatusFlagOpcodeHandler(Status.Carry, false, 2)],
  // CLD
  [0xd8, new StatusFlagOpcodeHandler(Status.Decimal, false, 2)],
  // CLI
  [0x58, new StatusFlagOpcodeHandler(Status.InterruptDisable, false, 2)],
  // CLV
  [0xb8, new StatusFlagOpcodeHandler(Status.Overflow, false, 2)],
  // SEC
  [0x38, new StatusFlagOpcodeHandler(Status.Carry, true, 2)],
  // SED
  [0xf8, new StatusFlagOpcodeHandler(Status.Decimal, true, 2)],
  // SEI
  [0x78, new StatusFlagOpcodeHandler(Status.InterruptDisable, true, 2)],
  // NOP
  [0xea, new NoopOpcodeHandler(2)],
]);
