import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import {
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractContextV2 } from '../../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractFactoryV2 } from './uniswap-contract.factory.v2';

export class UniswapContractFactoryV2Public extends UniswapContractFactoryV2 {
  constructor(
    providerContext: CeloProvider,
    factoryAddress: string = UniswapContractContextV2.factoryAddress
  ) {
    super(new EthersProvider(providerContext), factoryAddress);
  }
}
