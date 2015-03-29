/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./routes/utils/errorHandler')();
var logger = require('morgan');
var port = process.env.PORT || 7203;
var routes;

var environment = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
app.use(errorHandler.init);

routes = require('./routes/index')(app);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

app.listen(port, function() {
    var url = [
        'http://',
        this.hostname
    ].join('');
    console.log('Mock-Server started listening on: http://localhost:' + port);
});
