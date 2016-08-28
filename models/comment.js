'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    UserId: DataTypes.INTEGER,
    RequestId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });

        Comment.belongsTo(models.Request, {
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });
      }
    }
  });
  return Comment;
};
