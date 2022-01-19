import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import {
  EthersProvider,
} from '../../ethers-provider';
import { TokensFactory } from './tokens.factory';

export class TokensFactoryPublic extends TokensFactory {
  constructor(providerContext: CeloProvider) {
    super(new EthersProvider(providerContext));
  }
}
