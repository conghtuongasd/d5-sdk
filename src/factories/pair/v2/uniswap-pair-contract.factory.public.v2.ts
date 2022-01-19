import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import {
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractContextV2 } from '../../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapPairContractFactoryV2 } from './uniswap-pair-contract.factory.v2';

export class UniswapPairContractFactoryPublicV2 extends UniswapPairContractFactoryV2 {
  constructor(
    providerContext: CeloProvider,
    pairAddress: string = UniswapContractContextV2.pairAddress
  ) {
    super(new EthersProvider(providerContext), pairAddress);
  }
}
