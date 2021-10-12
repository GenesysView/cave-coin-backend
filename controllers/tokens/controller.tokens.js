var db = require('../../sqldb.js');
var Token = require('../../models/tokens/model.tokens.js');


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
        $or: [
            { "symbol": { '$regex': param, $options: ['i', '.*', '.*'] } },
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

}

module.exports.byToken = function (req, res) {
    Token.find({ link: req.params.token }, function (err, token) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        }
        console.log(token);

        res.send(token);
    });

}
