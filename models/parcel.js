const Sequelize = require('sequelize');

module.exports = class Parcel extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            sender:{
                type:Sequelize.STRING(40),
                allowNull: false,
            },
            status:{
                type:Sequelize.ENUM(['찾아감','보관중','분실']),
                allowNull: false,
            },
            createdAt: {
                type:Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Parcel',
            tableName: 'parcels',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }

    static associate(db){
        db.Parcel.belongsTo(db.User, {foreignKey: "recipient", targetKey: 'id'});
        db.Parcel.belongsTo(db.Dormitory, {foreignKey: 'dormitory', targetKey:'id'});
        db.Parcel.belongsTo(db.Room, {foreignKey:'room', targetKey:'id'})
    }

}