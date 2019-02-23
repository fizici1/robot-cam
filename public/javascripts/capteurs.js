document.getElementById('capteurs').className= 'active';

var ws = new WebSocket("ws://10.3.141.97:8080/capteur");

ws.onopen = function() {
	ws.send("connecté");
};

ws.onmessage = function (evt) {
	var dht = JSON.parse(evt.data);
	console.log(dht);
	document.getElementById('temp').innerHTML = "Température : " + dht[0];
	document.getElementById('hum').innerHTML = "Humidité : " + dht[1];
};






