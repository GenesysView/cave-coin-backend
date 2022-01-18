var SymbolCategory = require('../../models/symbol_category/model.symbol_category.js');

module.exports.index = function (req, res) {
    SymbolCategory.find(function (err, token) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        }
        console.log(token);

        res.send(token);
    });
}
