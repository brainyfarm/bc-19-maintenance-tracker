'use strict';

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
    }
  }, {
    classMethods: {
      associate: function(models) {
        Request.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });

        Request.belongsTo(models.User, { as: 'Expert' });
      }
    },

    instanceMethods: {
      declined: function () {
        return this.status === 'declined'
      },

      approve: function () {
        this.approved = true;
        if(this.declined()) {
          this.status = 'reported'
        }
      },

      decline: function () {
        this.approved = false;
        this.status = 'declined'
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
