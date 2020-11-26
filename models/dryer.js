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
            modelName: 'Dryer',
            tableName: 'dryers',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }

    static associate(db){
        db.Dryer.belongsTo(db.User, {foreignKey: 'dormitory', sourceKey:'id'});
    }

}