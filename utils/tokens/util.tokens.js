function findSymbolIntoList(symbol, name, list) {
    list.forEach(element => {
        if (element.name == name && element.symbol == symbol) {
            console.log(`element.name: ${element.name} = ${name} - element.symbol: ${element.symbol} = ${symbol}`);
            return element;
        }
    });
    return null;
}

module.exports = {
    findSymbolIntoList
};