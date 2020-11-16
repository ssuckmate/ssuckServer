const Sequelize = require('sequelize');

module.exports = class Dormitory extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name: {
                type:Sequelize.STRING(100),
                allowNull: false,
            },
            identifier: {
                type:Sequelize.STRING(10),
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Dormitory',
            tableName: 'dormitories',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }

    static associate(db){
        db.Dormitory.hasMany(db.User, {foreignKey: 'dormitory', sourceKey:'id'});
        db.Dormitory.hasMany(db.Room, {foreignKey: 'dormitory', sourceKey:'id'});
        db.Dormitory.hasMany(db.Sagam, {foreignKey: 'dormitory', sourceKey: 'id'});
        db.Dormitory.hasMany(db.IsNotAuthed, {foreignKey: 'dormitory', sourceKey: 'id'});
    }

}