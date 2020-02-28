const express = require('express')
var cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
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

app.get('/vue-element-admin/article/list',
  (req, res) => {

  User.find(function (err, result) {
    if (err) return console.error(err);
    console.log(result);

    ret = {"code":20000, "data":{total: result.length, items:result}}
    res.json(ret)
  })



  // db.collection("UserAuth").find({}).toArray(function(err, result) {
  //   if (err) throw err;
  //   // console.log(result);
  //   ret = {"code":20000,"data":{total: result.length, items:result}}
  //
  //   res.json(ret)
  //   // db.close();
  // });

 }
)

app.post('/vue-element-admin/article/update',
  (req, res) => {

    var body = req.body
    // var ObjectID = require('mongoose').ObjectID;

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

    // console.log('myquery:', myquery);
    //
    // const ret = User.update(myquery, newvalues);
    //
    // console.log('ret.n:', ret.n);


    // db.collection("UserAuth").updateMany(myquery, newvalues,{new: true}, function(err, res) {
    //   if (err) throw err;
    //   console.log("1 document updated");
    //   // console.log('res:', res);
    //   // db.close();
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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
