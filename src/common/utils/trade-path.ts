import { ChainId } from '../../enums/chain-id';
import { TradePath } from '../../enums/trade-path';
import { Token } from '../../factories/token/models/token';
import { Celo } from '../tokens/celo';

export function getTradePath(
  chainId: ChainId,
  fromToken: Token,
  toToken: Token,
  customNetworkNativeWrappedTokenInfo: Token | undefined
): TradePath {
  if (
    fromToken.contractAddress ===
    Celo.info(chainId, customNetworkNativeWrappedTokenInfo).contractAddress
  ) {
    return TradePath.ethToErc20;
  }

  if (
    toToken.contractAddress ===
    Celo.info(chainId, customNetworkNativeWrappedTokenInfo).contractAddress
  ) {
    return TradePath.erc20ToEth;
  }

  return TradePath.erc20ToErc20;
}
