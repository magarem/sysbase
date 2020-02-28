// 1 - framework de conexão
const mongoose = require('mongoose')

// 2 - Conexão
const MONGO_USERNAME = 'maga';
const MONGO_PASSWORD = 'maga108';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'medsys2';
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection; // Get the default connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// db.once('open', function() {


// 3 - Db Schema
var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  token: String,
  roles: String,
  introduction: String,
  avatar: String
});
var User = mongoose.model('User', UserSchema, 'UserAuth'); // compile schema to model


// 4 - Insere registro
// var Krsna = new User({ name: 'Krsna' });
// console.log(Krsna.name); // 'Silence'

// Krsna.save(function (err, fluffy) {
//     if (err) return console.error(err);
// });
// we're connected!
// });
// (async function(){
//   await db.collection('UserAuth').insertOne({
//     name: 'adm3',
//     password: '1',
//     token: 'admin-token3',
//     roles: 'normal',
//     introduction: 'Super Maguete!',
//     // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     avatar: 'http://www.themes-lab.com/traqs/assets/global/images/avatars/avatar2_big.png',
//   })
// })()

module.exports = User
