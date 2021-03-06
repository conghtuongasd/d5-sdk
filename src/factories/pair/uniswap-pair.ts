import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { CoinGecko } from '../../coin-gecko';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { getAddress } from '../../common/utils/get-address';
import { isAddress } from '../../common/utils/is-address';
import { EthersProvider } from '../../ethers-provider';
import { TokensFactory } from '../token/tokens.factory';
import {
  UniswapPairContextForProviderUrl,
} from './models/uniswap-pair-contexts';
import { UniswapPairFactoryContext } from './models/uniswap-pair-factory-context';
import { UniswapPairSettings } from './models/uniswap-pair-settings';
import { UniswapPairFactory } from './uniswap-pair.factory';

export class UniswapPair {
  private _ethersProvider: EthersProvider;

  constructor(
    private _uniswapPairContext: UniswapPairContextForProviderUrl
  ) {
    if (!this._uniswapPairContext.fromTokenContractAddress) {
      throw new UniswapError(
        'Must have a `fromTokenContractAddress` on the context',
        ErrorCodes.fromTokenContractAddressRequired
      );
    }

    if (!isAddress(this._uniswapPairContext.fromTokenContractAddress)) {
      throw new UniswapError(
        '`fromTokenContractAddress` is not a valid contract address',
        ErrorCodes.fromTokenContractAddressNotValid
      );
    }

    this._uniswapPairContext.fromTokenContractAddress = getAddress(
      this._uniswapPairContext.fromTokenContractAddress,
      true
    );

    if (!this._uniswapPairContext.toTokenContractAddress) {
      throw new UniswapError(
        'Must have a `toTokenContractAddress` on the context',
        ErrorCodes.toTokenContractAddressRequired
      );
    }

    if (!isAddress(this._uniswapPairContext.toTokenContractAddress)) {
      throw new UniswapError(
        '`toTokenContractAddress` is not a valid contract address',
        ErrorCodes.toTokenContractAddressNotValid
      );
    }

    this._uniswapPairContext.toTokenContractAddress = getAddress(
      this._uniswapPairContext.toTokenContractAddress,
      true
    );

    if (!this._uniswapPairContext.ethereumAddress) {
      throw new UniswapError(
        'Must have a `ethereumAddress` on the context',
        ErrorCodes.ethereumAddressRequired
      );
    }

    if (!isAddress(this._uniswapPairContext.ethereumAddress)) {
      throw new UniswapError(
        '`ethereumAddress` is not a valid address',
        ErrorCodes.ethereumAddressNotValid
      );
    }

    this._uniswapPairContext.ethereumAddress = getAddress(
      this._uniswapPairContext.ethereumAddress
    );

    const providerUrl = (<UniswapPairContextForProviderUrl>(
      this._uniswapPairContext
    )).providerUrl;

    const ethereumProvider = new CeloProvider(providerUrl);

    if (ethereumProvider) {
      this._ethersProvider = new EthersProvider(ethereumProvider);
      return;
    }

    throw new UniswapError(
      'Your must supply a chainId or a ethereum provider please look at types `UniswapPairContextForEthereumProvider`, `UniswapPairContextForChainId` and `UniswapPairContextForProviderUrl` to make sure your object is correct in what your passing in',
      ErrorCodes.invalidPairContext
    );
  }

  /**
   * Create factory to be able to call methods on the 2 tokens
   */
  public async createFactory(): Promise<UniswapPairFactory> {
    const tokensFactory = new TokensFactory(
      this._ethersProvider,
      this._uniswapPairContext.settings?.customNetwork
    );
    const tokens = await tokensFactory.getTokens([
      this._uniswapPairContext.fromTokenContractAddress,
      this._uniswapPairContext.toTokenContractAddress,
    ]);

    const uniswapFactoryContext: UniswapPairFactoryContext = {
      fromToken: tokens.find(
        (t) =>
          t.contractAddress.toLowerCase() ===
          this._uniswapPairContext.fromTokenContractAddress.toLowerCase()
      )!,
      toToken: tokens.find(
        (t) =>
          t.contractAddress.toLowerCase() ===
          this._uniswapPairContext.toTokenContractAddress.toLowerCase()
      )!,
      ethereumAddress: this._uniswapPairContext.ethereumAddress,
      settings: this._uniswapPairContext.settings || new UniswapPairSettings(),
      ethersProvider: this._ethersProvider,
    };

    return new UniswapPairFactory(new CoinGecko(), uniswapFactoryContext);
  }
}
