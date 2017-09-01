var db = require('../../sqldb.js');
var Office = require('../../models/offices/model.offices');
var OfficeHasCategory = require('../../models/officeshascategories/model.officeshascategories');

module.exports.index = function (req, res) {
    Office.find(function (err, office) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log(office);
         
        res.send(office);
    });
}

module.exports.show = function (req, res) {
    Office.find({_id:req.params.id},function (err, office) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log(office);
         
        res.send(office);
    });
}

module.exports.create = function (req, res) {
    console.log("office");
    console.log(req.body.office);
    var office = new Office(req.body.office);
    office.save(function (err) {
        if (err) {
            res.json({
                success: true,
                message: 'Error al Registar Office'
            });
        }
        res.json({
            success: true,
            message: 'Office Registrado con Exito'
        });
    })

}


module.exports.saveCategories = function (req, res) {
    console.log(req.body);
    var officeHasCategory = new OfficeHasCategory(req.body);
    officeHasCategory.save(function (err) {
        if (err) {
            res.json({
                success: true,
                message: 'Error al Registar Office'
            });
        }
        res.json({
            success: true,
            message: 'Office Registrado con Exito'
        });
    })

}


module.exports.findByCompany = function (req, res) {
    console.log(req.params.id);
    Office.find({idCompany:req.params.id, principal:false},function (err, office) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log("office");
        console.log(office);
        
        res.send(office);
    });
}

module.exports.saveCalificacion = function (req, res) {
    console.log('office');
    console.log(req.body);
    Office.find({_id:req.body.idOffice},function (err, office) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log('calificacion');
        office[0].calificaciones.push({idOffice:req.body.idOffice,idUser:req.body.idUser,puntaje:req.body.puntaje});  
        console.log(office);

        var query = { _id: req.body.idOffice };        
        Office.findOneAndUpdate(query, { $set: { calificaciones: office[0].calificaciones }}, function(error,officeupdate){
            if (err) {
                // Note that this error doesn't mean nothing was found,
                // it means the database had an error while searching, hence the 500 status
                    res.status(500).send(err)
                } 
                res.status(202);
                
        })
        
        
    });
}

module.exports.getCalificacion = function (req, res) {
    console.log('office');
    console.log(req.body);
    Office.find({_id:req.params.idOffice},function (err, office) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log('calificacion');
        office[0].calificaciones.push({idOffice:req.body.idOffice,idUser:req.body.idUser,puntaje:req.body.puntaje});  
        console.log(office);



        res.send(office[0].calificaciones);

        
        
    });
}
