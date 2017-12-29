window.onload=function(){
    var checkbox = document.querySelector("input[name=driveSwitch]");
    checkbox.addEventListener('change', setDrive);
}
function setDrive() {
    if(this.checked) {
        axios.post('https://things.ubidots.com/api/v1.6/devices/surveillancecar/drive/values/?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y',
        {
            "value": 1
        })
        .then(res => {
            console.log('uploaded');
        })
        .catch(err => {console.log(err)});
    } else {
        // Checkbox is not checked..
        axios.post('https://things.ubidots.com/api/v1.6/devices/surveillancecar/drive/values/?token=A1E-yz1uifC28k1uUWlvVQNUI40TCNXB6y',
        {
            "value": 0
        })
        .then(res => {
            console.log('uploaded');
        })
        .catch(err => {console.log(err)});
    }
}
