import { UniswapPairSettings } from './uniswap-pair-settings';

interface UniswapPairContextBase {
  fromTokenContractAddress: string;
  toTokenContractAddress: string;
  ethereumAddress: string;
  settings?: UniswapPairSettings | undefined;
}

export interface UniswapPairContextForEthereumProvider
  extends UniswapPairContextBase {
  ethereumProvider: any;
}

export interface UniswapPairContextForProviderUrl extends UniswapPairContextBase {
  providerUrl: string;
}
