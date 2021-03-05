var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var editRouter = require('./routes/edit');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const chatRouter = require('./routes/chat');

// Connection
const Connection = require('./models/Connection');

// Authentication
const { authenticateToken } = require('./middleware/authenticate');

// Chat
const { connectToChat } = require('./middleware/chatConnection');

// Clients
var clientConnections = [];

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Attach custom objects to request object
app.use((req, res, next) => {
  req.attachments = {};
  req.attachments.connections = clientConnections;
  req.attachments.connection = new Connection();
  next();
});

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/', [authenticateToken, connectToChat], indexRouter);
app.use('/chat', [authenticateToken, connectToChat], chatRouter);
app.use('/edit', authenticateToken, editRouter);
app.use('/logout', authenticateToken, logoutRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
