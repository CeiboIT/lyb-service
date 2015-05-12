var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var passportConf = require('./configs/passport');
//Routes managers
var routes = require('./routes/index');

/* *** Requires the controllers *** */

var users = require('./controllers/usersCtrl');
var categories = require('./controllers/categoriesCtrl');
var products = require('./controllers/productsCtrl');
var auth = require('./controllers/authCtrl');
var stores = require('./controllers/storesCtrl');
var statistics = require('./controllers/statisticsCtrl');
/*** * ** *****/

//Express app inited
var app = express();

//Configurations module
var configs = require('./configs/module');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(cors());
app.use(session({ secret: 'luxury', saveUninitialized: true, resave: true }));
app.use(bodyParser.json(configs.general.bodyLimit));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(passportConf.initialize);
app.use(passportConf.session);
app.use(express.static(path.join(__dirname, 'app')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));
//Routes front
app.use('/', routes);

//Defining which controller will be managing the calls in that endpoints.
app.use('/users', users);
app.use('/categories', categories);
app.use('/products', products);
app.use('/auth', auth);
app.use('/stores', stores);
app.use('/statistics', statistics);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

module.exports = app;