var express = require('express')
  //, routes = require('./routes')
  //, user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , fs = require('fs');

var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config.example')[env]
  , auth = require('./config/middlewares/authorization')
, mongoose = require('mongoose');

//Bootstrap models
var models_path = __dirname + '/app/model';
fs.readdirSync(models_path).forEach(function (file) {
if((file.substring(0, 1) !== '.')){
  console.log('File Name: ' + file);
  require(models_path+'/'+file);
}
});

require('./config/passport')(passport, config);
var app = express();
var routes = require('./config/express')(app, config, passport);
require('./config/routes')(app, passport, auth);


// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Bootstrap db connection
mongoose.connect(config.db);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
