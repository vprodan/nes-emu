export const checkPageBoundaryCross = (
  oldAddress: number,
  newAddress: number
) => (oldAddress & 0xff00) !== (newAddress & 0xff00);
