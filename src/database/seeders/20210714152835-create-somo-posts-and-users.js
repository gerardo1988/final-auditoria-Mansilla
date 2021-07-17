'use strict';

const { User} = require('../models/index');
const bcrypt = require('bcrypt');
const authConfig= require('../config/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Promise.all([

      User.create({

        name: "Antonio",
        email: "zaraza@gmail.com",
        password: bcrypt.hashSync("123456", +authConfig.rounds),
        posts: [
          {
            title: "Title 1",
            body: "body 1"
          },
          {
            title: "Title 2",
            body: "body 2"
          }
        ]
      },{
        include: "posts"
      }),

      User.create({

        name: "Lucia",
        email: "laLuci@gmail.com",
        password: bcrypt.hashSync("123456", +authConfig.rounds),
        posts: [
          {
            title: "Title 3",
            body: "body 3"
          },
          {
            title: "Title 4",
            body: "body 4"
          },

        ]
      },{
        include: "posts"
      })


    ])

    
  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.bulkDelete('posts',null,{}),
      queryInterface.bulkDelete('users',null,{})
    ]);
  }
};
