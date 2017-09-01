var db = require('../../sqldb.js');
var Company = require('../../models/companies/model.companies');
var Office = require('../../models/offices/model.offices');

module.exports.index = function (req, res) {
    Company.find(function (err, login) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log(login);
         
        res.send(login);
    });
}

module.exports.show = function (req, res) {
    res.json({
        success: true,
        message: 'api cargado',
        token: 'token'
    });
}

module.exports.findByUser = function (req, res) {
    Company.find({idUser:req.params.iduser},function (err, login) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log(login);
         
        res.send(login);
    });
}

module.exports.create = function (req, res) {
    console.log('company');
    console.log(req.body);
    var company = new Company(req.body.company);
    company.save(function (err) {
        if (err) {
            res.json({
                success: true,
                message: 'Error al Registar Empressa'
            });
        }
        var office = req.body.office;
        office.id_company=company._id;
        office.principal=true;1
        console.log('office edit');
        console.log(office);
        var officesave = new Office(office);
        officesave.save(function (err) {
        if (err) {
            res.json({
                success: true,
                message: 'Error al Registar Empresa'
            });
        }


         res.json({
            success: true,
            message: 'Empresa Registrado con Exito'
        });   
        })

       
    })

}

    module.exports.updatePicture = function (req, res) {
      console.log(req.params);
      //console.log(req.body);
      var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");

        require("fs").writeFile("images/companies/"+req.params.id+".png", base64Data, 'base64', function(err) {
        console.log(err);
                if (err) {
                    res.json({
                        success: true,
                        message: 'Error al Cambiar Foto de Perfil'
                    });
                }

                Company.update({ _id: req.params.id }, { $set: { picture: "facemapp-backend/images/perfil/"+req.params.id+".png" }}, function (err) {
                    res.json({
                    success: true,
                    message: 'Imagen Actualizada'
                });     
                });

        });
    }
