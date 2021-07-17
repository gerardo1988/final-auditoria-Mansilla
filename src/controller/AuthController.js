const { User } = require('../database/models/index');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const authConfig= require ('../database/config/auth');
module.exports= {

    //funcion para el login
    signIn(req, res){

        let{ email, password }= req.body;

        //busco el usuario
        User.findOne({
            
            where: {

                email: email
            }
        }).then(user => {

            if(!user){

                res.status(404).json({msg: "no se ha encontrado el usuario de este correo"});
            
            }else{

                if(bcrypt.compareSync(password, user.password)){

                    //creo el token
                    let token= jwt.sign({ user: user }, authConfig.secret,{

                        expiresIn: authConfig.expires
                    });

                    res.json({

                        user: user,
                        token: token
                    })
                
                }else{

                    //autorizacion denegada
                    res.status(401).json({msg: "contraseña incorrecta"});
                }
            }

        }).catch(err => {

            res.status(500).json(err);
        })


    },

    //funcion para el registro
    signUp(req, res){

        //encripto la contraseña
        let password= bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        //esto crea un usuario
        User.create({

            name: req.body.name,
            email: req.body.email,
            password: password
       
        }).then(user => {

            //creo el token
            let token= jwt.sign({ user: user }, authConfig.secret,{

                expiresIn: authConfig.expires
            });

            res.json({

                user: user,
                token: token
            });
        
        }).catch(err => {

            res.status(500).json(err);
        })


    }
}