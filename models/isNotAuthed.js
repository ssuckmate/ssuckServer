const Sequelize = require('sequelize');

module.exports = class IsNotAuthed extends Sequelize.Model{
    static init(sequelize){
        return super.init({

        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'IsNotAuthed',
            tableName: 'isnotautheds',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          });
    };
    static associate(db){
        db.IsNotAuthed.belongsTo(db.User, {foreignKey: 'user', targetKey:'id'});
        db.IsNotAuthed.belongsTo(db.Dormitory, {foreignKey: 'dormitory', targetKey:'id'});
    }
}