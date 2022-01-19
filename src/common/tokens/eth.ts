import { ChainId } from '../../enums/chain-id';
import { NativeCurrencyInfo } from '../../factories/pair/models/custom-network';
import { Token } from '../../factories/token/models/token';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';
import { deepClone } from '../utils/deep-clone';

const ETH_PREFIX = '_CELO';
export const ETH_SYMBOL = 'CELO';
export const ETH_NAME = 'CELO';

export const appendEthToContractAddress = (contractAddress: string): string => {
  return `${contractAddress}${ETH_PREFIX}`;
};

export const removeEthFromContractAddress = (
  contractAddress: string
): string => {
  return contractAddress
    .replace(ETH_PREFIX, '')
    .replace(ETH_PREFIX.toLowerCase(), '');
};

export const isNativeEth = (contractAddress: string): boolean => {
  return contractAddress.includes(ETH_PREFIX);
};

export const turnTokenIntoEthForResponse = (
  token: Token,
  nativeCurrencyInfo: NativeCurrencyInfo | undefined
): Token => {
  const clone = deepClone(token);
  // clear down contract address
  clone.contractAddress = 'NO_CONTRACT_ADDRESS';
  if (nativeCurrencyInfo) {
    clone.symbol = nativeCurrencyInfo.symbol;
    clone.name = nativeCurrencyInfo.name;
  } else {
    clone.symbol = ETH_SYMBOL;
    clone.name = ETH_NAME;
  }

  return clone;
};

/**
 * ETH token info
 */
export class Celo {
  public static MAINNET(): Token {
    return {
      chainId: ChainId.Mainnet,
      contractAddress: appendEthToContractAddress(
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
      ),
      decimals: 18,
      symbol: ETH_SYMBOL,
      name: ETH_NAME,
    };
  }

  public static Alfajores(): Token {
    return {
      chainId: ChainId.Alfajores,
      contractAddress: appendEthToContractAddress(
        '0xc778417E063141139Fce010982780140Aa0cD5Ab'
      ),
      decimals: 18,
      symbol: ETH_SYMBOL,
      name: ETH_NAME,
    };
  }

  /**
   * Get ETH token info by chain id
   * @param chainId The chain id
   */
  public static info(
    chainId: ChainId | number,
    customNetworkNativeWrappedTokenInfo: Token | undefined = undefined
  ): Token {
    if (customNetworkNativeWrappedTokenInfo) {
      return {
        ...customNetworkNativeWrappedTokenInfo,
        contractAddress: appendEthToContractAddress(
          customNetworkNativeWrappedTokenInfo.contractAddress
        ),
      };
    }
    switch (chainId) {
      case ChainId.Mainnet:
        return this.MAINNET();
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
