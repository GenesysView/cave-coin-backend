var db = require('../../sqldb.js');
var Token = require('../../models/tokens/model.tokens.js');

var User = require('../../models/users/model.users.js');
var Login = require('../../models/logins/model.logins');
const axios = require('axios');
const cheerio = require('cheerio');
const { text } = require('body-parser');


module.exports.index = function (req, res) {
    User.find(function (err, office) {
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
    User.find({ _id: req.params.id }, function (err, user) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        }
        console.log(user);

        res.send(user);
    });

}

module.exports.create = function (req, res) {
    console.log('user save');
    console.log(req.body.user);
    var user = new User(req.body.user);
    user.save(function (err) {
        if (err) {
            res.json({
                success: true,
                message: 'Error al Registar Usuario'
            });
        }
        var login = new Login({
            email: req.body.user.email,
            password: req.body.user.password,
            active: true,
            user_name: null,
            id_user: user._id
        });
        login.save(function (err) {
            if (err) {
                res.json({
                    success: true,
                    message: 'Error al Registar Usuario'
                });
            }


            res.json({
                success: true,
                data: user._id,
                message: 'Usuario Registrado con Exito'
            });
        })
    })



}


module.exports.updatePicture = function (req, res) {
    console.log(req.params);
    //console.log(req.body);
    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile("images/perfil/" + req.params.id + ".png", base64Data, 'base64', function (err) {
        console.log(err);
        if (err) {
            res.json({
                success: true,
                message: 'Error al Cambiar Foto de Perfil'
            });
        }

        User.update({ _id: req.params.id }, { $set: { picture: "facemapp-backend/images/perfil/" + req.params.id + ".png" } }, function (err) {
            res.json({
                success: true,
                message: 'Imagen Actualizada'
            });
        });

    });
}

module.exports.update = function (req, res) {
    console.log('office');
    console.log(req.body);
    console.log(req.params);
    var query = { _id: req.params.id };
    User.findOneAndUpdate(query, {
        $set: {
            nameUser: req.body.user.name, name: req.body.user.nameUser,
            facebook: req.body.user.facebook, description: req.body.user.description,
            categorias: req.body.user.categorias
        }
    }, function (err, officeupdate) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err)
        }
        console.log(',iguel.');
        console.log(officeupdate);
        //res.status(202);
        res.json({
            success: true,
            message: 'Perfil Actualizado'
        });

    })
}

module.exports.bnb = async function (req, res) {

    let count = 1;
    let next = true;
    let respuesta = [];
    while (next) {
        const pageContent = await axios.get('https://bscscan.com//tokens?p=' + count);
        const $ = cheerio.load(pageContent.data);
        const presentations = $('#ContentPlaceHolder1_divresult tr').map((_, el) => {
            el = $(el);
            let logo = el.find('.u-xs-avatar').attr('src');
            let name = el.find('h3').text();
            let link = el.find('.text-primary').attr('href');
            let description = el.find('.media-body p').text();
            let symbol = '';

            if (name != '') {
                logo = 'https://bscscan.com/' + logo;
                link = link.replace("/token/", "");
                symbol = name.split('(');
                symbol = symbol[1].replace(')', '');
            }
            return { logo, name, link, symbol, description };
        }).get();
        respuesta = [].concat(respuesta, presentations);
        console.log(presentations);
        count++;
        if (presentations.length <= 0) {
            next = false;
        }
    }


    Token.insertMany(respuesta).then(function () {
        res.json({
            'respuesta': respuesta
        });
    }).catch(function (error) {
        res.json({
            'error': 'ha ocurrido un error al guardar los datos'
        });
    });


}