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
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      get: function () {
        const roles = this.getDataValue('roles') || '[]';
        return JSON.parse(roles);
      },
      set: function (value) {
        return this.setDataValue('roles', JSON.stringify(value));
      }
    },
    phone: DataTypes.STRING

  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Request);
      },

      validPassword: (user, password) => {
        return bcrypt.compareSync(password, user.password);
      }
    },

    instanceMethods: { },

    hooks: {
      beforeValidate: (user, options) => {
        user.isAdmin = user.isAdmin || false;
        if (user.roles.length < 1){
          user.roles = ['user'];
        }
      },

      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
      }
    }
  });
  return User;
};
