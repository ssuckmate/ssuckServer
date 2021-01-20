const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            contents:{
                type:Sequelize.STRING(400),
                allowNull: false,
            },
        },{
            sequelize,
            underscored: false,
            modelName: 'Notice',
            tableName: 'notices',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }

    static associate(db){
        db.Parcel.belongsTo(db.Dormitory, {foreignKey: 'dormitory', targetKey:'id'});
        db.Parcel.belongsTo(db.Sagam, {foreignKey:'sagam', targetKey:'id'})
    }

}