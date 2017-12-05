var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var pug = require('pug');
var axios = require('axios');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.set('view engine','pug');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname+'/public'));

var title = 'Surveillance Car';
var navItems = ['Home','Incidents','Stats','Settings'];

var Api = (function(){
  var api = {}

  api.getTemperature = function(cb) {
    axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/temperature/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y&start=1511377038610')
    .then(function(response){
      return cb(response.data);
    })
  }

  return api;
})();

function getTemp() {
  const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/temperature/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y&start=1511377038610')
  
  return req
    .then(result => { /*console.log(result.data); */return result; })
    .catch(error => { console.log(error); throw error;})

}

app.get(['/','/Home'], function (req, res) {
  res.render('index', {title: title, navItems: navItems});
});

app.get('/Incidents', function(req, res) {
  res.render('incidents', {title: title, navItems: navItems});
});

app.get('/Stats', function(req, res) {
  var temp = getTemp();

  temp.then(result => { res.render('stats', {title: title, navItems: navItems, temperature: result.data.results})});
});

app.get('/Settings', function(req, res) {
  res.render('settings', {title: title, navItems: navItems});
});

const httpServer = http.createServer(app);
httpServer.listen(1337, function(){
  var port = httpServer.address().port;
  console.log('\n > Server is listening at port %s', port,'\n');
});