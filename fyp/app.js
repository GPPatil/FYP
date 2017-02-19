var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const port = require('./feed-readings');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);


io.on('connection', (socket) => {
  let clients = Object.keys(io.sockets.connected);
  io.emit('user-connected', clients.length);
  
  socket.on('disconnect', () => {
    clients = Object.keys(io.sockets.connected);
    io.emit('user-disconnected', clients.length);
  });

  // socket.on('turn-on-loadLight', () => {
  //   port.write("loadLight:1\r\n");
  // });

  // socket.on('turn-off-loadLight', () => {
  //   port.write("loadLight:0\r\n");
  // });

    socket.on('loadLight-value-change', (data) => {
      port.write(data);
    });
});



app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  io.emit('readings', req.body.readings);
  console.log(req.body.readings);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


http.listen(3000);
