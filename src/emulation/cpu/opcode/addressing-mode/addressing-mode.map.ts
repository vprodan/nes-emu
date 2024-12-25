import { AddressingMode } from "./addressing-mode";
import { OperationalRegister } from "../operational-register";
import { IndirectAddressingMode } from "./modes/indirect.addressing-mode";
import { BaseAddressingMode } from "./base.addressing-mode";
import { AbsoluteAddressingMode } from "./modes/absolute.addressing-mode";
import { ImmediateAddressingMode } from "./modes/immediate.addressing-mode";
import { RelativeAddressingMode } from "./modes/relative.addressing-mode";
import { ZeroPageAddressingMode } from "./modes/zero-page.addressing-mode";

const { X, Y } = OperationalRegister;

export const AddressingModeMap: ReadonlyMap<
  AddressingMode,
  BaseAddressingMode
> = new Map<AddressingMode, BaseAddressingMode>([
  [AddressingMode.Absolute, new AbsoluteAddressingMode()],
  [AddressingMode.AbsoluteX, new AbsoluteAddressingMode(X)],
  [AddressingMode.AbsoluteY, new AbsoluteAddressingMode(X)],

  [AddressingMode.Immediate, new ImmediateAddressingMode()],

  [AddressingMode.Indirect, new IndirectAddressingMode()],
  [AddressingMode.IndirectX, new IndirectAddressingMode(X)],
  [AddressingMode.IndirectY, new IndirectAddressingMode(Y)],

  [AddressingMode.Relative, new RelativeAddressingMode()],

  [AddressingMode.ZeroPage, new ZeroPageAddressingMode()],
  [AddressingMode.ZeroPageX, new ZeroPageAddressingMode(X)],
  [AddressingMode.ZeroPageY, new ZeroPageAddressingMode(Y)],
]);
