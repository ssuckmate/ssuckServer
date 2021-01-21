const Sequelize = require('sequelize');

module.exports = class Dormitory extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name: {
                type:Sequelize.STRING(100),
                allowNull: false,
            },
            story: {
                type:Sequelize.INTEGER,
                allowNull:false,
            },
            dormitoryCode: {
                type:Sequelize.STRING(10),
                allowNull: false,
            }
        },{
            sequelize,
            timestamps:false,
            underscored: false,
            modelName: 'Dormitory',
            tableName: 'dormitories',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }

    static associate(db){
        db.Dormitory.hasMany(db.User, {foreignKey: 'dormitory', sourceKey:'id'});
        db.Dormitory.hasMany(db.Room, {foreignKey: 'dormitory', sourceKey:'id'});
        db.Dormitory.hasMany(db.Sagam, {foreignKey: 'dormitory', sourceKey: 'id'});
        db.Dormitory.hasMany(db.Parcel, {foreignKey: 'dormitory', sourceKey: 'id'});
        db.Dormitory.hasMany(db.Point, {foreignKey: 'dormitory', sourceKey: 'id'});
    }

}