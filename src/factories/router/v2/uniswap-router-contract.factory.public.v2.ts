import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import {
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapRouterContractFactoryV2 } from './uniswap-router-contract.factory.v2';

export class UniswapRouterContractFactoryV2Public extends UniswapRouterContractFactoryV2 {
  constructor(providerContext: CeloProvider) {
    super(new EthersProvider(providerContext));
  }
}
