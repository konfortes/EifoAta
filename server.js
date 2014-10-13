var path = require('path');
// var async = require('async');
var express = require('express');
var app = express();
var compression = require('compression');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var NodeCache = require("node-cache");
app.cache = new NodeCache({stdTTL: 100, checkperiod: 120});

app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || "0.0.0.0");
// middlewares
app.use(compression({threshold : 0}));
app.use(express.static(path.resolve(__dirname, 'public'))); // set the static files location
app.use(cookieParser());
app.use(session({secret : 'konfortes', resave : true, saveUninitialized : true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(morgan('combined'));

var auth = require("./auth");
auth.init(app);
var routes = require("./routes");
routes.init(app);

var server = app.listen(app.get('port'), app.get("ip"), function() {
    var addr = server.address();
    console.log("EifoAta server listening at", addr.address + ":" + addr.port);
});

require("./sockets").init(server);
