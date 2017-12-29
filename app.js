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
var navItems = ['Home','Stats','Settings'];

function getLastTemperature() {
  const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/temperature/values/?page_size=1&token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
  
  return req
    .then(result => { return result; })
    .catch(error => { console.log(error); throw error;})
}

function getLastHumidity() {
  const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/humidity/values/?page_size=1&token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
  
  return req
    .then(result => { return result; })
    .catch(error => { console.log(error); throw error;})
}

function getAccidents() {
  const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/obstacle/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
  
  return req
    .then(result => { return result; })
    .catch(error => { console.log(error); throw error;})
}
function getLastAccident() {
  const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/obstacle/values/?page_size=1&token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')

  return req
  .then(result => { return result; })
  .catch(error => { console.log(error); throw error;})
}

app.get(['/','/Home'], function (req, res) {
  getLastAccident().then(result => {
    console.log(result.data.results[0]);
    var time = moment(result.data.results[0].created_at).format('LLL');
    var obj = {'time':time};
    getLastTemperature().then(result2 => {
      var time2 = moment(result2.data.results[0].created_at).format('LL');
      var temp = result2.data.results[0].value;
      var obj2 = {'time':time2,'data':temp};
      getLastHumidity().then(result3 => {
        var time3 = moment(result3.data.results[0].created_at).format('LL');
        var hum = result3.data.results[0].value;
        var obj3 = {'time':time3,'data':hum};
        res.render('index',{title:title, navItems:navItems, la: obj, temp:obj2, hum:obj3});
      })
    })
    
  })

});

app.get('/Stats', function(req, res) {
  var accidentData = getAccidents();
  accidentData.then(result => {
    var acc = [];
    result.data.results.forEach(element => {
      var time = moment(element.created_at).format('LL');
      var obj = {'date': time};
      acc.push(obj);
    });
    console.log(acc);
    res.render('stats', {title: title, navItems: navItems, accidents: acc});
  });
});

app.get('/Settings', function(req, res) {
  res.render('settings', {title: title, navItems: navItems});
});

const httpServer = http.createServer(app);
httpServer.listen(1337, function(){
  var port = httpServer.address().port;
  console.log('\n > Server is listening at port %s', port,'\n');
});