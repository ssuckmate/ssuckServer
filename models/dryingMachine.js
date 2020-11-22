const Sequelize = require('sequelize');

module.exports = class DryingMachine extends Sequelize.Model{
    static init(sequelize){
        return super.init({
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
            timestamps: true,
            underscored: false,
            modelName: 'DryingMachine',
            tableName: 'dryingmachines',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }

    static associate(db){
        db.DryingMachine.belongsTo(db.User, {foreignKey: 'dormitory', sourceKey:'id'});
    }

}