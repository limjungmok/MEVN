// index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var {ID, PWD} = require('./config');

mongoose.connect(`mongodb+srv://${ID}:${PWD}@cluster0.xmppt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))

var db = mongoose.connection;

db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) { // 1
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');

  /**
   * Access-Control-Allow-Origin: 요청이 허용되는 URL을 route을 제외하고 적습니다. 이외의 URL로 부터 오는 요청은 거절됩니다. 단 *은 모든 요청을 허가시킵니다.
   * Access-Control-Allow-Methods:요청이 허용되는 HTTP verb 목록을 적습니다. 여기에 포함되지 않은 HTTP verb의 요청은 거절됩니다. *을 사용할 수 없습니다.
   * Access-Control-Allow-Headers: 요청이 허용되는 HTTP header 목록을 적습니다. 여기에 포함되지 않은 HTTP header는 사용할 수 없습니다.  *을 사용할 수 없습니다.
   */
  next();
});

// API
app.use('/api/users', require('./api/users'));
app.use('/api/carousels', require('./api/carousels'));

// Port setting
var port = 3999;

app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});

