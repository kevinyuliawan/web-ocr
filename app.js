
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , upload = require('./routes/upload')
  , results = require('./routes/results')
  , http = require('http')
  , path = require('path');

var app = express();

// custom variables
var EventEmitter = require( "events" ).EventEmitter;
var outtext = '';
var controller = new EventEmitter();
upload.configure(controller);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
// customize the formidable bodyparser with some options
app.use(express.bodyParser({uploadDir: __dirname + '/uploads/tmp', keepExtensions: true}));
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/upload', upload.get);
app.post('/upload', upload.post);
app.get('/results', results.get);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
