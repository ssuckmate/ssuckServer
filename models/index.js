const Sequelize = require('sequelize');
const User = require('./user');
const Parcel = require('./parcel');
const Dormitory = require('./dormitory');
const Room = require('./room');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize =new Sequelize(config.database, config.username, config.password, config);;

db.sequelize = sequelize;

db.User = User;
console.info('@@@@@@@',User);
db.Parcel = Parcel;
db.Dormitory = Dormitory;
db.Room = Room;

User.init(sequelize)
Parcel.init(sequelize)
Dormitory.init(sequelize)
Room.init(sequelize)


User.associate(db)
Parcel.associate(db)
Dormitory.associate(db)
Room.associate(db)

module.exports = db;
