var express = require('express');
var routers = require('./app/router/routes');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var url = require('url');
var app = express();

app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(session({
	cookie: ('name', 'value', { path: '/', httpOnly: true, secure: false, maxAge: 3600 * 1000 }),
	name: 'sessionId',
  	resave: true,
  	saveUninitialized: true,
  	secret:'lzkzz'
}));
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routers);


module.exports = app;