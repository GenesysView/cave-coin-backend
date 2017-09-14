var db = require('../../sqldb.js');
var BusinessCategory = require('../../models/businesscategories/model.businesscategories');
module.exports.index = function (req, res) {
    BusinessCategory.find(function (err, businessCategory) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log(businessCategory);
         
        res.send(businessCategory);
    }).sort('name');
}

module.exports.show = function (req, res) {
    BusinessCategory.find({_id:req.params.id},function (err, businessCategory) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log(businessCategory);
         
        res.send(businessCategory);
    });
}


