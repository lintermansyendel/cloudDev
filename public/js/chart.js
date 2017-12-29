google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawTempChart);
google.charts.setOnLoadCallback(drawHumChart);

function getTemp() {
    const req = axios.get('https://things.ubidots.com/api/v1.6/devices/surveillancecar/temperature/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
    
    return req
        .then(result => { return result; })
        .catch(error => { console.log(error); throw error;})
}
var tempData = getTemp();

async function drawTempChart() {
    var dataset = [];
    dataset.push(new Array('Date', 'Temperature'));
    
    await getTemp().then(result => {
        var temp = [];
        result.data.results.forEach(function(item){
          var time = moment(item.created_at).format('LL');
          var obj = {'temp':item.value,'date':time}
          temp.push(new Array(time, item.value));
        });
        temp = temp.reverse();
        temp.forEach(item => {dataset.push(item)});
      })
      .catch(error => {console.log(error)});
    
    var data = google.visualization.arrayToDataTable(dataset);

  var options = {
    title: 'Temperature over time',
    'height':600,
    vAxis: {
        title: 'Temperature (° Celsius)'
      },
      legend: 'none'
  };

  var tempchart = new google.visualization.LineChart(document.getElementById('tempchart'));

  tempchart.draw(data, options);
}

function getHum() {
  const req = axios.get('https://things.ubidots.com/api/v1.6/devices/surveillancecar/humidity/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
  
  return req
      .then(result => { return result; })
      .catch(error => { console.log(error); throw error;})
}
var humData = getHum();

async function drawHumChart() {
  var dataset = [];
  dataset.push(new Array('Date', 'Humidity'));
  
  await getHum().then(result => {
      var hum = [];
      result.data.results.forEach(function(item){
        var time = moment(item.created_at).format('LL');
        var obj = {'temp':item.value,'date':time}
        hum.push(new Array(time, item.value));
      });
      hum = hum.reverse();
      hum.forEach(item => {dataset.push(item)});
    })
    .catch(error => {console.log(error)});
  
  var data = google.visualization.arrayToDataTable(dataset);

var options = {
  title: 'Humidity over time',
  'height':600,
  vAxis: {
      title: 'Humidity (%)'
    },
    legend: 'none'
};

var chart = new google.visualization.LineChart(document.getElementById('humchart'));

chart.draw(data, options);
}
