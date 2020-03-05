const express = require('express')
var cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
// 1 - framework de conexão
const mongoose = require('mongoose')
const User = require('./user');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
const port = 3000

const path = __dirname + '/views/';


app.use(cors({
    origin:['http://localhost:3000','http://localhost:9527'],
    methods:['OPTIONS', 'GET','POST', 'PATCH', 'DELETE'],
    credentials: true // enable set cookie
}));

//
// Login
//
app.post('/vue-element-admin/user/login',
  (req, res) => {
  console.log('req.body:', req.body)

  // Testa se existe
  var pass = false

  var username = req.body.username
  var password = req.body.password

  console.log('username:', username);
  console.log('password:', password);

  // db.once('open', function() {
  //     console.log('--------');
  User.findOne({name: username, password: password}, function (err, result) {
    if (err) return console.error(err);
    if (result) {
      console.log('result.token:', result.token);
      if (result.token) {
         pass = true
         ret = {"code":20000,"data":{"token": result.token}}
       }
      res.json(ret)
    }
  })

  // db.collection("UserAuth").findOne({name: username, password: password}, function(err, result) {
  //   if (err) throw err;
  //   if (result) {
  //     console.log('result.token:', result.token);
  //     if (result.token) {
  //        pass = true
  //        ret = {"code":20000,"data":{"token": result.token}}
  //      }
  //     res.json(ret)
  //   }
  // });

 }
)
app.get('/vue-element-admin/user/info',
  (req, res) => {
    var token = req.query.token
    console.log('token:', token)

    User.findOne({token: token}, function (err, ret) {
      if (err) return console.error(err);
      ret = {"code":20000, "data":{"roles": [ret.roles],"introduction": ret.introduction, "avatar": ret.avatar, "name": ret.name}}
      res.json(ret)
    })


    // ret = {"code":20000,"data":{"roles":["normal"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
    // console.log('ret:', ret);
    // const aa = async () => {
    //   const cursor = await db.collection('inventory3').find({ item: 'krisna' });
    //   //console.log(cursor);
    // }
    // async function searchToken(token){
    //   const ret = await db.collection("UserAuth").findOne({token: token})
    //   // console.log('result:', ret);
    //   return ret;
    // }

    // ret = {"code":20000,"data":{"roles":["normal"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
    // searchToken(token).then(function(ret){
    //   //console.log('ret->:', ret);
    //   ret = {"code":20000, "data":{"roles": [ret.roles],"introduction": ret.introduction, "avatar": ret.avatar, "name": ret.name}}
    //   // ret = {"code":20000,"data":{"roles":["normal"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
    //   res.json(ret)
    // })

  }
)
app.post('/vue-element-admin/user/logout', (req, res) => res.json({"code":20000,"data":"success"}))


//
//  User
//
app.get('/vue-element-admin/user',
  (req, res) => {

  User.find(function (err, result) {
    if (err) return console.error(err);
    console.log(result);

    ret = {"code":20000, "data":{total: result.length, items:result}}
    res.json(ret)
  })
 }
)
app.post('/vue-element-admin/user',
  (req, res) => {
    var body = req.body
    console.log('body:', body);
    // var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
    User.insertMany(body, function(error, docs) {
      console.log('docs[0]._id:', docs[0]._id);
      res.json({
          code:20000,
          msg: 'ok',
          ret: docs[0]
      });
    });
 }
)
app.patch('/vue-element-admin/user',
  (req, res) => {

    var body = req.body

    User.findById(req.body._id).then((model) => {
            return Object.assign(model, body);
        }).then((model) => {
            return model.save();
        }).then((updatedModel) => {
            res.json({
                code:20000,
                msg: 'model updated',
                updatedModel
            });
        }).catch((err) => {
            res.send(err);
        });
 }
)
app.delete('/vue-element-admin/user', (req, res) => {
  console.log('req.query.id:', req.query.id);

  User.deleteOne({ _id: req.query.id }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });


  res.json({
    code: 20000,
    msg: 'Deleted'
  });
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
