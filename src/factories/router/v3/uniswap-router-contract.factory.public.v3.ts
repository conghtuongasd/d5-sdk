import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import {
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapRouterContractFactoryV3 } from './uniswap-router-contract.factory.v3';

export class UniswapRouterContractFactoryV3Public extends UniswapRouterContractFactoryV3 {
  constructor(providerContext: CeloProvider) {
    super(new EthersProvider(providerContext));
  }
}
