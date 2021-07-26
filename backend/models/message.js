'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Message.init({
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    reported: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Message',
  });

  Message.afterDestroy(async message => {
    if (message.imageUrl) {
      await deleteFile(message.imageUrl)
    }
  })

  Message.afterUpdate(async message => {
    if (message.dataValues.imageUrl !== message._previousDataValues.imageUrl) {
      await deleteFile(message._previousDataValues.imageUrl)
    }
  })


  return Message;
};