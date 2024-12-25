export function wrap8bit(value: number) {
  return value & 0xff;
}

export function wrap16bit(value: number) {
  return value & 0xffff;
}
