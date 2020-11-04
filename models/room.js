const Sequelize = require('sequelize');
const { Dormitory } = require('.');

module.exports = class Room extends Sequelize.Model{
    static init(sequelize){
        return super.init({

        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Room',
            tableName: 'rooms',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }
    static associate(db){
        db.Room.hasMany(db.User, {foreignKey: 'room', sourceKey: 'id'});
        db.Room.belongsTo(db.Dormitory, {foreignKey: 'dormitory', targetKey:'id'});
    }
}