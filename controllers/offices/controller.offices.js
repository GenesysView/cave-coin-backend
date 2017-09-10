var db = require('../../sqldb.js');
var Office = require('../../models/offices/model.offices');
var OfficeHasCategory = require('../../models/officeshascategories/model.officeshascategories');
var User = require('../../models/users/model.users.js');

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
    console.log('officina buscadaa');
    console.log(req.params.id)
    Office.find({_id:req.params.id},function (err, office) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        if(office.calificaciones==null){
            office.calificaciones=new Array();
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
        Office.findOneAndUpdate(query, { $set: { calificaciones: office.calificaciones }}, function(error,officeupdate){
            if (err) {
                // Note that this error doesn't mean nothing was found,
                // it means the database had an error while searching, hence the 500 status
                    res.status(500).send(err);
                } 
                res.status(202).send(officeupdate);
                
        })
        
        
    });
}

module.exports.getCalificacion = function (req, res) {
    //console.log('office');
    //console.log(req.body);
    Office.find({_id:req.params.idOffice},function (err, office) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log('calificacionn');
        console.log(office);
        if(office.calificaciones==null){
            office.calificaciones=new Array();
        }        
        office.calificaciones.push({idOffice:req.body.idOffice,idUser:req.body.idUser,puntaje:req.body.puntaje});  
        console.log('calificacionn2');
        console.log(office);



        res.send(office[0].calificaciones);

        
        
    });
}


module.exports.officesanduser = function (req, res) {
    var palabra=/^soft/i ;
    console.log(palabra);
    console.log('entro');
    Office.find({name: new RegExp("^"+req.params.name,'i')},function (err, office) {
        var list=new Array();
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 

        //res.send(office);
 
        User.find({ $or: [ {categorias: new RegExp("^"+req.params.name,'i')}, { name: new RegExp("^"+req.params.name,'i') } ] },function (err, user) {
            if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
                res.status(500).send(err)
            }
            console.log('user combinadoo'); 
            console.log(user);
             
            
             for(var x=0;x<user.length;x++){
                console.log(user[x]);
                var categorias=user[x].categorias;
                    list.push({id:user[x]._id,name:user[x].name,tipe:1,adress:user[x].adress});
                
            }
            res.send(list);
            
        }); 
        console.log('office combinado'); 
        console.log(office);
        for(var x=0;x<office.length;x++){
            list.push({id:office[x]._id,name:office[x].name,tipe:0,adress:office[x].adress});
        }
         
    });
}