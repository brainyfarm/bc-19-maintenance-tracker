'use strict';
const User = require('./index').User;

// Request model
module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    description: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "reported"
    },
    type: {
      allowNull: false,
      defaultValue: 'maintenance',
      type: DataTypes.STRING
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    photoUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Request.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });

        Request.belongsTo(models.User, { as: 'Expert' });
        Request.hasMany(models.Comment);
      }
    },

    scopes: {
      defaultScope: {
        order: [ ['id',  'DESC'] ] 
      },

      latest: {
        limit: 5
      }
    },
    instanceMethods: {
      rejected: function () {
        return this.status === 'rejected'
      },

      resolved: function () {
        return this.status === 'resolved'
      },

      approve: function () {
        this.approved = true;
        if(this.rejected()) {
          this.status = 'reported'
        }
      },

      reject: function () {
        this.approved = false;
        this.status = 'rejected'
      }
    },

    hooks: {
       beforeCreate: (request, options) => {
         request.slug = request.description.split(' ').join('-').toLowerCase();
         request.status = request.status || 'reported';
       }
    }
  });

  return Request;
};
