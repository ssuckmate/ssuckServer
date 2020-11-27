const Sequelize = require('sequelize');

module.exports = class WashingMachine extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            status:{
                type: Sequelize.ENUM(["비었음",'사용중'])
            },
            floor:{
                type: Sequelize.INTEGER,
                allowNull:false,
            },
            occupant: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            endTime: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Washer',
            tableName: 'washers',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }

    static associate(db){
        db.Washer.belongsTo(db.User, {foreignKey: 'dormitory', sourceKey:'id'});
    }

}