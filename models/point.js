const Sequelize = require('sequelize');

module.exports = class Point extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            type:{
                type: Sequelize.ENUM(['상점','벌점']),
                allowNull: false,
            },amount:{
                type: Sequelize.INTEGER,
                allowNull: false,
            }
            ,reason:{
                type:Sequelize.STRING(40),
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
            modelName: 'Point',
            tableName: 'points',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          })
    }

    static associate(db){
        db.Parcel.belongsTo(db.User, {foreignKey: "user", targetKey: 'id'});
        db.Parcel.belongsTo(db.Dormitory, {foreignKey: "dormitory", targetKey: 'id'});
    }

}