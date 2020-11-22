const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            phoneNum: {
                type: Sequelize.STRING(15),
                defaultValue: "00000000000",
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            isAuthed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            penalty: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            advantage:{
                type: Sequelize.INTEGER,
                defaultValue:0,
            }
        }, {
              sequelize,
              timestamps: true,
              underscored: false,
              modelName: 'User',
              tableName: 'users',
              charset: 'utf8',
              collate: 'utf8_general_ci',
        }); 
    };
    
    static associate(db){
        db.User.belongsTo(db.Dormitory, {foreignKey: 'dormitory', targetKey:'id'});
        db.User.belongsTo(db.Room, {foreignKey: 'room', targetKey: 'id'});
        db.User.hasMany(db.Parcel, {foreignKey:'recipient', sourceKey:'id'});
        db.User.hasOne(db.IsNotAuthed, {foreignKey:'user', sourceKet: 'id'});
    }
}