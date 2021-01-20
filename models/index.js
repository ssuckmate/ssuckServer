const Sequelize = require('sequelize');
const User = require('./user');
const Parcel = require('./parcel');
const Dormitory = require('./dormitory');
const Room = require('./room');
const Sagam = require('./sagam');
const Dryer = require('./dryer')
const Washer = require('./washer')
const Notice = require('./notice');


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
db.Dryer = Dryer;
db.Washer = Washer;
db.Notice = Notice;


User.init(sequelize);
Parcel.init(sequelize);
Dormitory.init(sequelize);
Room.init(sequelize);
Sagam.init(sequelize);
Dryer.init(sequelize);
Washer.init(sequelize);
Notice.init(sequelize);


User.associate(db);
Parcel.associate(db);
Dormitory.associate(db);
Room.associate(db);
Sagam.associate(db);
Dryer.associate(db);
Washer.associate(db);
Notice.associate(db);

module.exports = db;
