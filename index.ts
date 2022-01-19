import { TradeDirection, UniswapPair, UniswapPairSettings, UniswapVersion } from "./src";

async function main() {
    const uniswapPair = new UniswapPair({
        providerUrl: "https://forno.celo.org",
        ethereumAddress: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
        fromTokenContractAddress: "0x471ece3750da237f93b8e339c536989b8978a438",
        toTokenContractAddress: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
        settings: new UniswapPairSettings({
            slippage: 0.005,
            deadlineMinutes: 20,
            disableMultihops: false,
            uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
        }),
    });

    const factory = await uniswapPair.createFactory();
    const routers = factory.findBestRoute("122", TradeDirection.input);
    console.log(routers);

}

main();