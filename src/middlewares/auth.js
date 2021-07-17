const jwt= require('jsonwebtoken');
const authConfig= require('../database/config/auth');
const { User }= require('../database/models/index')

module.exports = (req, res, next) => {

    //compruebo que el token existe
    if(!req.headers.authorization){

        res.status(401).json({
            
            msg: "Acceso no autorizado"});

    }else {

        //compruebo la validez de este token
        let token= req.headers.authorization.split(" ")[1];

        jwt.verify(token, authConfig.secret, (err, decoded) => {

            if(err){

                res.status(500).json({

                    msg: "ha ocurrido un problema al decodificar el token", err});

            }else{

                User.findByPk(decoded.user.id, {
                    include: "roles"
                }).then(user =>{

                    //consolse.log(user.roles);
                    req.user= user;
                    next();
                })
            }
        })
    }

    

};