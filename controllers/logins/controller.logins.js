var db = require('../../sqldb.js');
var Login = require('../../models/logins/model.logins');
module.exports.index = function (req, res) {
    res.json({
        success: true,
        message: 'api cargado',
        token: 'token'
    });
}

module.exports.show = function (req, res) {
    res.json({
        success: true,
        message: 'api cargado',
        token: 'token'
    });
}

module.exports.findByUserId = function (req, res) {
    Login.find({id_user:req.params.id},function (err, login) {
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        } 
        console.log(login);
         
        res.send(login);
    });
   
}

module.exports.login = function (req, res) {
    console.log(req.params.email);
    Login.find({email:req.params.email, password:req.params.password},function (err, people) {  
    if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        res.status(500).send(err)
    } else {
        // send the list of all people
        console.log('usuario');
        console.log(people[0]);
        if(people[0]==undefined){
            res.send();
        }else{
            res.send(people[0].id_user);
        }
        
    }
    });

 
}

module.exports.create = function (req, res) {
    console.log(req.body.login);
    var login = new Login(req.body.login);
    login.save(function (err) {
        if (err) {
            res.json({
                success: true,
                message: 'Error al Registar Login'
            });
        }
        res.json({
            success: true,
            message: 'Login Registrado con Exito'
        });
    })

}
