'use strict';

const bcrypt = require("bcrypt-nodejs");


// User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: DataTypes.STRING

  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Request);
        User.hasMany(models.Request, { as: 'Tasks'})
      },

      validPassword: (user, password) => {
        return bcrypt.compareSync(password, user.password);
      }
    },

    instanceMethods: { },

    hooks: {
      beforeValidate: (user, options) => {
        user.isAdmin = user.isAdmin || false;
        user.role = user.role || 'user';
      },

      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
      }
    }
  });
  return User;
};
