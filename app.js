var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var pug = require('pug');
var moment = require('moment');
var axios = require('axios');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.set('view engine','pug');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname+'/public'));

moment.locale('nl-be');

var title = 'Surveillance Car';
var navItems = ['Home','Incidents','Stats','Settings'];

function getTemp() {
  const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/temperature/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
  
  return req
    .then(result => { /*console.log(result.data); */return result; })
    .catch(error => { console.log(error); throw error;})
}
/*
function getHumidity() {
  const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/humidity/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
  
  return req
    .then(result => { return result; })
    .catch(error => { console.log(error); throw error;})
}*/

function getAccidents() {
  const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/obstacle/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
  
  return req
    .then(result => { return result; })
    .catch(error => { console.log(error); throw error;})
}

app.get(['/','/Home'], function (req, res) {
  /*var tempData = getTemp();
  var humData = getHumidity();*/

  /*tempData.then(result => {
    var temp = [];
    result.data.results.forEach(function(item){
      var time = moment(item.created_at).format('LL');
      var obj = {'temp':item.value,'date':time}
      temp.push(obj);
    });
    res.render('index', {title: title, navItems: navItems, temperature: temp, humidity: [{temp:"cold",date:"today"}]});
  })
  .catch(error => {
    res.render('stats',{title:title, navItems:navItems, temperature:[{temp:"cold",date:"today"}]});
  });*/
  
});

app.get('/Incidents', function(req, res) {
  res.render('incidents', {title: title, navItems: navItems});
});

app.get('/Stats', function(req, res) {
  /*var tempData = getTemp();
  var humData = getHumidity();

  tempData.then(result => {
    var temp = [];
    result.data.results.forEach(function(item){
      var time = moment(item.created_at).format('LL');
      var obj = {'temp':item.value,'date':time}
      temp.push(obj);
    });
    res.render('stats', {title: title, navItems: navItems});
  });*/
  var accidentData = getAccidents();
  accidentData.then(result => {
    var acc = [];
    console.log(accidentData);
    result.data.results.forEach(element => {
      var time = moment(element.created_at).format('LL');
      var obj = {'date': time};
      acc.push(obj);
    });
    console.log(acc);
    res.render('stats', {title: title, navItems: navItems, accidents: acc});
  });
  //res.render('stats', {title: title, navItems: navItems});
});

app.get('/Settings', function(req, res) {
  res.render('settings', {title: title, navItems: navItems});
});

const httpServer = http.createServer(app);
httpServer.listen(1337, function(){
  var port = httpServer.address().port;
  console.log('\n > Server is listening at port %s', port,'\n');
});