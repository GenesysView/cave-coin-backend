var db = require('../../sqldb.js');
var Token = require('../../models/tokens/model.tokens.js');
var SymbolCategory = require('../../models/symbol_category/model.symbol_category.js');
var UtilToken = require('../../utils/tokens/util.tokens.js');
const axios = require('axios');
const Web3 = require('web3');
// const fetch = require("node-fetch");
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(`${process.cwd()}/config/contractABI.json`);

module.exports.index = function (req, res) {
    Token.find(function (err, token) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        }
        console.log(token);

        res.send(token);
    });
}

module.exports.show = function (req, res) {
    Token.find({ _id: req.params.id }, function (err, token) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        }
        console.log(token);

        res.send(token);
    });

}

module.exports.searchByNameAndSymbol = function (req, res) {
    let param = req.params.item;
    Token.find({
        'address.name': req.params.platform,
        $or: [
            { "symbol": { '$regex': param, $options: ['i', '.*', '.*'] } },
            { "name": { '$regex': param, $options: ['i', '.*', '.*'] } },
            { "description": { '$regex': param, $options: ['i', '.*', '.*'] } }
        ]
    }, function (err, token) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        }
        res.send(token);
    });
    // $or: [
    //     { "symbol": { '$regex': param, $options: ['i', '.*', '.*'] } },
    //     { "description": { '$regex': param, $options: ['i', '.*', '.*'] } }
    // ]
}

module.exports.byToken = function (req, res) {
    Token.find({ 'address.address': req.params.token }, function (err, token) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        }
        console.log(token);

        res.send(token);
    });

}


module.exports.updateListTokens = async function (req, res) {

    SymbolCategory.find(async function (err, response) {
        if (err) {
            res.status(500).send(err)
        }
        console.log('+++response', response);

        let responseRest = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
        responseRest = responseRest.data;
        let temporalList = [];
        for (let index = 0; index < response.length; index++) {
            const elementSymbolCategory = response[index];
            console.log('---elementSymbolCategory', elementSymbolCategory.key);
            for (let j = 0; j < responseRest.length; j++) {
                let item = responseRest[j];
                if (item.platforms.hasOwnProperty(elementSymbolCategory.key) && item.platforms[elementSymbolCategory.key] != "") {
                    let platforms = [{
                        'name': elementSymbolCategory.key,
                        'address': item.platforms[elementSymbolCategory.key]
                    }]

                    let checkSymbol = null;
                    let checkSymbolCount = 0;

                    for (let k = 0; k < temporalList.length; k++) {
                        const elementtemporalList = temporalList[k];
                        if (elementtemporalList.name == item.name && elementtemporalList.symbol == item.symbol) {
                            console.log(`element.name: ${elementtemporalList.name} = ${item.name} - element.symbol: ${elementtemporalList.symbol} = ${item.symbol}`);
                            checkSymbol = elementtemporalList;
                            checkSymbolCount = k;
                        }
                    }

                    if (checkSymbol == null) {
                        temporalList.push({
                            logo: item,
                            name: item.name,
                            address: platforms,
                            symbol: item.symbol,
                            description: "",
                            exchange: 'coingecko',
                            identifier: item.id
                        });
                    } else {
                        temporalList[checkSymbolCount].address.push(platforms[0]);
                    }

                }
            }
        }



        Token.create(temporalList, function (err) {
            if (err) {
                res.json({
                    success: true,
                    message: 'Error al Registar Symbols'
                });
            }
            console.log('symbols guardados con exito');
            res.json({
                success: true,
                message: 'symbols guardados con exito',
                temporalList: temporalList
            });
        })

    });

}






module.exports.getOHLCVHistorical = async function (req, res) {
    let token = req.body.token;
    let network = req.body.network;
    console.log('network', network);
    let quote = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
    if (network == 'binance-smart-chain') {
        network = 'bsc';
        quote = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
    } else if (network == 'ethereum') {
        network = 'ethereum';
        quote = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    } else if (network == 'polygon-pos') {
        network = 'matic';
        quote = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270';
    }

    console.log('token', token);
    let config = {
        headers: {
            'content-type': 'application/json',
            'X-API-KEY': 'BQYvhnv04csZHaprIBZNwtpRiDIwEIW9'
        }
    }

    let request = JSON.stringify({
        query: `
        query {  ethereum(network: ${network}) {    dexTrades(      options: {limit: 100, desc: \"timeInterval.day\"        }      protocol: {is: \"Uniswap v2\"        }      baseCurrency: {is: \"${token}\"        }      quoteCurrency: {is: \"${quote}\"        }      exchangeName: {is: \"Pancake v2\"        }    ) {      exchange {        name            }      timeInterval {        day(count: 1)            }      baseCurrency {        symbol        address            }      baseAmount      quoteCurrency {        symbol        address            }      quoteAmount      trades: count      maximum_price: quotePrice(calculate: maximum)      minimum_price: quotePrice(calculate: minimum)      open_price: minimum(of: time, get: quote_price)      close_price: maximum(of: time, get: quote_price)      tradeAmount(in: USD, calculate: sum)        }    }}
      `,
    });

    let responseRest = null;

    try {
        responseRest = await axios.post('https://graphql.bitquery.io', request, config);
        responseRest = responseRest.data;
    } catch (error) {
        console.log('error', error);
    }

    console.log('responseRest', responseRest);
    let listTrade = [];
    if (responseRest.data.ethereum != null) {
        for (let index = 0; index < responseRest.data.ethereum.dexTrades.length; index++) {
            const trade = responseRest.data.ethereum.dexTrades[index];
            listTrade.push([new Date(trade.timeInterval.day).getTime(), trade.open_price, trade.maximum_price, trade.minimum_price, trade.close_price, trade.tradeAmount]);
        }
    }
    console.log(responseRest);

    listTrade.sort();
    res.json({
        success: true,
        message: 'symbols guardados con exito',
        response: listTrade
    });

}