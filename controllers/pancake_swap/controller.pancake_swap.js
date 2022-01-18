const { ethers } = require('ethers');
const { Contract } = require('ethers');
const { utils } = require('ethers');
const { providers } = require('ethers');
const web3 = require('web3');
const { ChainId, Token, TokenAmount, Fetcher, Pair, Route, Trade, TradeType, Percent } =
    require('@pancakeswap-libs/sdk-v2');

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

const contract = {
    factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // PancakeSwap V2 factory
    router: '0x10ED43C718714eb63d5aA57B78B54704E256024E', // PancakeSwap V2 router
};
// const tokens = {
//     BUSD: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
// };

const router = new ethers.Contract(
    contract.router,
    ['function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)'],
    provider
);


// const addresses = {
//     WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
//     BUSD: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
//     PANCAKE_ROUTER: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
// }


module.exports.swap = function (req, res) {

    let tokenFrom = req.body.tokenFrom;
    let tokenTo = req.body.tokenTo;

    // if (tokenFrom.indexOf('0x') === -1) {
    //     tokenFrom = tokens[tokenFrom.toUpperCase()];
    // }

    // if (tokenTo.indexOf('0x') === -1) {
    //     tokenTo = tokens[tokenTo.toUpperCase()];
    // }

    if (tokenFrom) {
        getPrice(tokenFrom, tokenTo).then(price => {
            res.json({
                success: true,
                BUSD: price
            });
        });

    } else {
        res.status(400).json({
            success: false,
            description: 'missing `token` parameter'
        });
    }

}

async function getPrice(inputCurrency, outputCurrency) {
    console.log('inputCurrency', inputCurrency);
    console.log('outputCurrency', outputCurrency);

    const amounts = await router.getAmountsOut(ethers.utils.parseUnits('1', 18), [outputCurrency, inputCurrency]);
    console.log('amounts', amounts);
    const amounts2 = await router.getAmountsOut(ethers.utils.parseUnits('1', 18), [inputCurrency, outputCurrency]);
    console.log('amounts2', amounts);

    // let fee = 0.0025;
    // let amountInWithFee = amounts * (1 - fee);
    // let price_impact = amountInWithFee / (reserve_a_initial + amountInWithFee);

    const ONE_ETH_IN_WEI = web3.utils.toBN(web3.utils.toWei('1'))
    const tradeAmount = ONE_ETH_IN_WEI.div(web3.utils.toBN('1000'))
    const [TO, FROM] = await Promise.all(
        [inputCurrency, outputCurrency].map(tokenAddress => (
            new Token(
                ChainId.MAINNET,
                tokenAddress,
                18
            )
        )));

    console.log('TO',TO);
    console.log('FROM',FROM);

    // console.log('por aqui pase');

    const pair = await Fetcher.fetchPairData(TO, FROM, provider)
    console.log('pair', pair);

    // const poolAddress = pair.liquidityToken.address; // CAKE-USDT
    // const poolContract = new Contract(
    //     poolAddress,
    //     ['function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)'],
    //     provider
    // );

    // poolContract.getReserves()
    //     .then((reserves) => {
    //         console.log('reserves',reserves);
    //         let reserve_a_initial = parseFloat(utils.formatUnits(reserves._reserve0));
    //         let reserve_b_initial = parseFloat(utils.formatUnits(reserves._reserve1));
    //         console.log(`CAKE in pool: ${reserve_a_initial}`);
    //         console.log(`USDT in pool: ${reserve_b_initial}`);

    //         const fee = 0.0025;
    //         let max_price_impact = 0.01;
    //         let amount_traded_cake = reserve_a_initial * max_price_impact / ((1 - max_price_impact) * (1 - fee));
    //         let amount_traded_usdt = reserve_b_initial * max_price_impact / ((1 - max_price_impact) * (1 - fee));
    //         console.log(`Given a max price impact of ${max_price_impact * 100}%, the max amount of CAKE tradeable is ${amount_traded_cake}`);
    //         console.log(`Given a max price impact of ${max_price_impact * 100}%, the max amount of USDT tradeable is ${amount_traded_usdt}`);

    //         let amountInCAKE = amount_traded_cake * (1 - fee);
    //         let amountInUSDT = amount_traded_usdt * (1 - fee);
    //         let price_impact_trade_cake = amountInCAKE / (reserve_a_initial + amountInCAKE);
    //         let price_impact_trade_usdt = amountInUSDT / (reserve_b_initial + amountInUSDT);
    //         console.log(`Price impact when trading ${amount_traded_cake} CAKE: ${price_impact_trade_cake * 100}%`);
    //         console.log(`Price impact when trading ${amount_traded_usdt} USDT: ${price_impact_trade_usdt * 100}%`);
    //     }).catch(
    //         (err) => {
    //             console.log('err', err);
    //         }
    //     );





    // const route = await new Route([pair], WBNB)
    // console.log('route', route);
    // const trade = await new Trade(route, new TokenAmount(WBNB, tradeAmount), TradeType.EXACT_INPUT)
    // console.log('trade', trade);
    // const slippageTolerance = new Percent('50', '10000')
    // console.log('slippageTolerance', slippageTolerance);
    // // create transaction parameters
    // const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw
    // console.log('amountOutMin', amountOutMin);
    // const path = [WBNB.address, BUSD.address]
    // console.log('path', path);
    // // const to = admin3
    // const to = 'admin3'
    // const deadline = Math.floor(Date.now() / 1000) + 60 * 20
    // console.log('deadline', deadline);
    // const value = trade.inputAmount.raw;
    // console.log('value', value);

    return { amount: amounts[1].toString() / 1e18, amounts2: amounts2[1].toString() / 1e18 };
}