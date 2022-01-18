var db = require('../../sqldb.js');
var Token = require('../../models/tokens/model.tokens.js');
var SymbolCategory = require('../../models/symbol_category/model.symbol_category.js');
const axios = require('axios');
var fs = require('fs');
var request = require('request');


module.exports.updateTokenListFromCoingecko = async function (req, res) {

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
                            logo: null,
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

                } else if (Object.keys(item.platforms).length === 0) {
                    // temporalList.push({
                    //     logo: null,
                    //     name: item.name,
                    //     address: [],
                    //     symbol: item.symbol,
                    //     description: "",
                    //     exchange: 'coingecko',
                    //     identifier: item.id
                    // });
                }
            }
        }



        Token.create(temporalList, function (err) {
            if (err) {
                return res.json({
                    success: true,
                    message: 'Error al Registar Symbols',
                    err
                });
            }
            console.log('symbols guardados con exito');
            return res.json({
                success: true,
                message: 'symbols guardados con exito',
                temporalList: temporalList
            });
        })

    });

}


module.exports.updateInfoTokenListFromCoingecko = async function (req, res) {
    Token.find(async function (err, response) {
        for (let index = 0; index < response.length; index++) {
            const element = response[index];
            let responseRest = null;
            try {
                responseRest = await axios.get('https://api.coingecko.com/api/v3/coins/' + element.identifier);
                responseRest = responseRest.data;
            } catch (error) {

            }
            console.log('responseRest', element.identifier);
            if (responseRest != null && responseRest.image.hasOwnProperty("large")) {
                let image = responseRest.image["large"];
                console.log(image);
                download(image, 'images/coin-icons/' + element.identifier + '.png', function () {
                    console.log('done', element.identifier);
                    Token.update({ identifier: element.identifier }, { logo: 'coin-icons/' + element.identifier + '.png' }, function (err, response) {
                        console.log('---------err', err);
                        console.log('---------response', response);
                    })
                });
            }
        }

        return res.json({
            success: true,
            message: 'symbols guardados con exito'
        });
    });
}


function download(uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};