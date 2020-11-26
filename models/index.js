const Sequelize = require('sequelize');
const User = require('./user');
const Parcel = require('./parcel');
const Dormitory = require('./dormitory');
const Room = require('./room');
const Sagam = require('./sagam');
const DryingMachine = require('./dryingMachine')
const WashingMachine = require('./washingMachine')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Parcel = Parcel;
db.Dormitory = Dormitory;
db.Room = Room;
db.Sagam = Sagam;
db.DryingMachine = DryingMachine;
db.WashingMachine = WashingMachine;


User.init(sequelize);
Parcel.init(sequelize);
Dormitory.init(sequelize);
Room.init(sequelize);
Sagam.init(sequelize);
DryingMachine.init(sequelize);
WashingMachine.init(sequelize);


User.associate(db);
Parcel.associate(db);
Dormitory.associate(db);
Room.associate(db);
Sagam.associate(db);
DryingMachine.associate(db);
WashingMachine.associate(db);


module.exports = db;
