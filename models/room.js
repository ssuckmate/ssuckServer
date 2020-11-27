const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            roomNum:{
                type:Sequelize.INTEGER,
                allowNull: false,
            },
            floor:{
                type:Sequelize.INTEGER,
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Room',
            tableName: 'rooms',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }
    static associate(db){
        db.Room.hasMany(db.User, {foreignKey: 'room', sourceKey: 'id'});
        db.Room.belongsTo(db.Dormitory, {foreignKey: 'dormitory', targetKey:'id'});
    }
}