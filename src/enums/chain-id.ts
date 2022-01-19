export enum ChainId {
  Mainnet = 42220,
  Alfajores = 44787
}

export const ChainNames = new Map<number, string>([
  [ChainId.Mainnet, 'Mainnet'],
  [ChainId.Alfajores, 'Alfajores']
]);
