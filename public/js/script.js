'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {
                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});

function getLastTemp() {
    const req = axios.get('https://things.ubidots.com/api/v1.6/devices/surveillancecar/temperature/lv?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
    
    return req
        .then(result => { return result; })
        .catch(error => { console.log(error); throw error;})
}

function getLastHum() {
    const req = axios.get('https://things.ubidots.com/api/v1.6/devices/surveillancecar/humidity/lv?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y')
    
    return req
        .then(result => { return result; })
        .catch(error => { console.log(error); throw error;})
}

var data = null;

async function getValues() {
    data = {
        'temp':'',
        'hum':''
    }
    
    console.log('clicked!');
    await getLastTemp().then(result => {
        data.temp = result.data;
    })
    await getLastHum().then(result => {
        data.hum = result.data;
    })

    var datanode = document.createElement('p');
    var nodetxt = document.createTextNode("Temperature: " + data.temp + "°C\n\rHumidity: " + data.hum + "%");
    datanode.appendChild(nodetxt);

    document.getElementById('values').innerHTML = "Temperature: " + data.temp + "°C\nHumidity: " + data.hum + "%";

    var box = document.createElement('div');
    box.className = "box";
    var h1 = document.createElement('h1');
    h1.className = "title is-1";
    h1.innerHTML = "Hot or Not?"
    var h3 = document.createElement('h3');
    if(data.temp >= 25) {
        h3.className = "title is-3 has-text-danger";
        h3.innerHTML = "It is hot";
    } else if (data.temp <= 13) {
        h3.className = "title is-3 has-text-info";
        h3.innerHTML = "It is cold";
    } else {
        h3.className = "title is-3";
        h3.innerHTML = "It is OK";
    }
    box.appendChild(h1);
    box.appendChild(h3);
    var container = document.getElementsByClassName('container');
    container[0].appendChild(box);
}
