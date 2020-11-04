const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userId:{
                type:Sequelize.INTEGER,
                allowNull: true,
            }
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
        db.Room.hasMany(db.User,{foreignkey:"room",sourceKey: 'id'});
    }
}