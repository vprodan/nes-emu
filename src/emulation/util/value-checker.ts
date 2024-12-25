export const isNegative = (value: number) => (value & 0b1000_0000) !== 0;
export const isZero = (value: number) => value === 0;
export const isOverflowArith = (a: number, b: number, result: number) =>
  ((result ^ a) & (result ^ b) & 0x80) !== 0;
export const isOverflowBit = (value: number) => (value & 0b0100_0000) !== 0;
export const isCarryAdd = (value: number) => value > 0xff;
export const isCarrySub = (value: number) => value >= 0;
export const isCarryLeft = isNegative;
export const isCarryRight = (value: number) => (value & 0b1) !== 0;
export const isCarryCompare = isCarrySub;
