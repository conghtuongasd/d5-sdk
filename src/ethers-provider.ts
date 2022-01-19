import BigNumber from 'bignumber.js';
import { Contract, ContractInterface, providers } from 'ethers';
import { ErrorCodes } from './common/errors/error-codes';
import { UniswapError } from './common/errors/uniswap-error';
import { ChainId, ChainNames } from './enums/chain-id';
import { CustomNetwork } from './factories/pair/models/custom-network';
import { CeloProvider } from "@celo-tools/celo-ethers-wrapper";

export interface ChainIdAndProvider {
  chainId: ChainId;
  providerUrl?: string | undefined;
  customNetwork?: CustomNetwork | undefined;
}

export interface EthereumProvider {
  ethereumProvider: any;
  customNetwork?: CustomNetwork | undefined;
}

export class EthersProvider {
  private _ethersProvider: CeloProvider;
  constructor(providerContext: CeloProvider) {
    this._ethersProvider = providerContext;
  }

  /**
   * Creates a contract instance
   * @param abi The ABI
   * @param contractAddress The contract address
   */
  public getContract<TGeneratedTypedContext>(
    abi: ContractInterface,
    contractAddress: string
  ): TGeneratedTypedContext {
    const contract = new Contract(contractAddress, abi, this._ethersProvider);

    return contract as unknown as TGeneratedTypedContext;
  }

  /**
   * Get the network
   */
  public network(): providers.Network {
    if (this._ethersProvider.network) {
      return this._ethersProvider.network;
    }

    // @ts-ignore
    if (this._ethersProvider.provider) {
      // @ts-ignore
      const chainId = this._ethersProvider.provider.chainId;
      if (chainId) {
        const chainIdNumber = new BigNumber(chainId).toNumber();
        const chainName = ChainNames.get(chainIdNumber);
        if (chainName) {
          return {
            chainId: chainIdNumber,
            name: chainName,
          };
        }
      }
    }

    throw new UniswapError(
      'chainId can not be found on the provider',
      ErrorCodes.chainIdCanNotBeFound
    );
  }

  /**
   * Get the ethers provider
   */
  public get provider(): providers.BaseProvider {
    return this._ethersProvider;
  }

  /**
   * Get eth amount
   * @param ethereumAddress The ethereum address
   */
  public async balanceOf(ethereumAddress: string): Promise<string> {
    return (
      await this._ethersProvider.getBalance(ethereumAddress)
    ).toHexString();
  }

  /**
   * Get provider url
   */
  public getProviderUrl(chainId: any): string | undefined {
    switch (chainId) {
      case ChainId.Mainnet:
        return `https://forno.celo.org`;
      case ChainId.Alfajores:
        return `https://alfajores-forno.celo-testnet.org`;
      default:
        return undefined;
    }
  }
}
