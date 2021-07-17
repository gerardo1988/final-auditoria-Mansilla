'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      
      User.hasMany(models.Post,{
        foreignKey: "userId",
        as:"posts"
      });

      User.belongsToMany(models.Role,{
        as: "roles",
        through: "user_role",
        foreignKey: "user_id"
      });
    }
  };
  User.init({
    name:{

      type: DataTypes.STRING,
      allowNull:false,
      validate: {

        isAlpha: {

          msg: "el nombre solo puede contener letras"

        },
        len: {

          args: [2,255],
          msg:"el nombre tiene que tener minimo dos caracteres"
        }

      }

    },
    password: {

      type: DataTypes.STRING,
      allowNull:false,
      validate: {

        len: {

          args: [6,255],
          msg: "la contraseña tiene que tener como minimo seis caracteres"
        }
      }

    },
    email: {

      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {

        isEmail: {

          msg: "el email tiene que ser un correo valido"
        }
      }

    }
  }, {
    sequelize,
    modelName: 'User',
  });

  //comprueba que el usuario es administrador
  User.isAdmin= function(roles){
    let tmpArray= [];

    roles.forEach(role => tmpArray.push(role.role));

    return tmpArray.includes('admin');

  }

  return User;
};