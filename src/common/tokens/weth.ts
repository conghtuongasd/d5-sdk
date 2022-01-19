import { ChainId } from '../../enums/chain-id';
import { Token } from '../../factories/token/models/token';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';

export const WETH_SYMBOL = 'WETH';
export const WETH_NAME = 'Wrapped Ether';

/**
 * WETH token context (called `WETHContract` so people get a breaking changes if they use the old name of `WETH`)
 */
export class WETHContract {
  public static Mainnet(): Token {
    return {
      chainId: ChainId.Mainnet,
      contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      decimals: 18,
      symbol: WETH_SYMBOL,
      name: WETH_NAME,
    };
  }

  public static Alfajores(): Token {
    return {
      chainId: ChainId.Alfajores,
      contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      decimals: 18,
      symbol: WETH_SYMBOL,
      name: WETH_NAME,
    };
  }

  /**
   * Get WETH token info by chain id
   * @param chainId The chain id
   */
  public static token(chainId: ChainId | number): Token {
    switch (chainId) {
      case ChainId.Mainnet:
        return this.Mainnet();
      case ChainId.Alfajores:
        return this.Alfajores();
      default:
        throw new UniswapError(
          `${chainId} is not allowed`,
          ErrorCodes.tokenChainIdContractDoesNotExist
        );
    }
  }
}
