google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function getTemp() {
    const req = axios.get('http://things.ubidots.com/api/v1.6/devices/surveillancecar/temperature/values?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
    
    return req
        .then(result => { /*console.log(result.data); */return result; })
        .catch(error => { console.log(error); throw error;})
}
var tempData = getTemp();

async function drawChart() {
    var dataset = [];
    dataset.push(new Array('Date', 'Temp'));
    
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

  var chart = new google.visualization.LineChart(document.getElementById('chart'));

  chart.draw(data, options);
}