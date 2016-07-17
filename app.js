var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;
app.set('view engine', 'ejs'); // set up ejs for templating
app.use('/',express.static('angularMacTest/'));
app.use('/node_modules',express.static('node_modules/'));

app.get('/', function(req, res){
 res.sendFile(__dirname + '/angularMacTest/index.html');
 });
app.listen(port);
console.log('angularMacTest running at http://localhost:'+port);