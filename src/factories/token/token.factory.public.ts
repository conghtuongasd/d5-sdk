import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import {
  EthersProvider,
} from '../../ethers-provider';
import { TokenFactory } from './token.factory';

export class TokenFactoryPublic extends TokenFactory {
  constructor(
    tokenContractAddress: string,
    providerContext: CeloProvider
  ) {
    super(tokenContractAddress, new EthersProvider(providerContext));
  }
}
