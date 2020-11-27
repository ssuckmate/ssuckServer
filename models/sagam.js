const Sequelize = require('sequelize');

module.exports = class Sagam extends Sequelize.Model{
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
        }, {
              sequelize,
              timestamps: false,
              underscored: false,
              modelName: 'Sagam',
              tableName: 'sagams',
              charset: 'utf8',
              collate: 'utf8_general_ci',
        }); 
    };
    
    static associate(db){
        db.User.belongsTo(db.Dormitory, {foreignKey: 'dormitory', targetKey:'id'});
    }
}