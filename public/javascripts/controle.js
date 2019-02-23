document.getElementById('controle').className= 'active';

var ws = new WebSocket("ws://10.3.141.97:8080/controle");

var canvas = document.createElement("canvas");

document.getElementById('livestream').appendChild(canvas);

var wsavc = new WSAvcPlayer(canvas, "webgl");

var protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
wsavc.connect(protocol + '//' + window.location.host + '/video-stream');

ws.onopen = function() {
	console.log("controle connecté");
};

var slider0 = new Slider('#servo0', {
	focus: true,
	formatter: function(value) {
		return value;
	}
});

var slider1 = new Slider('#servo1', {
	focus: true,
	formatter: function(value) {
		return value;
	}
});

var slider2 = new Slider('#servo2', {
	focus: true,
	formatter: function(value) {
		return value;
	}
});

var slider3 = new Slider('#servo3', {
	focus: true,
	formatter: function(value) {
		return value;
	}
});

var slider12 = new Slider('#servo12', {
	focus: true,
	formatter: function(value) {
		return value;
	}
});

var slider13 = new Slider('#servo13', {
	focus: true,
	formatter: function(value) {
		return value;
	}
});

var slider14 = new Slider('#servo14', {
	focus: true,
	formatter: function(value) {
		return value;
	}
});

var slider15 = new Slider('#servo15', {
	focus: true,
	formatter: function(value) {
		return value;
	}
});

slider0.on('slide', function(value) {
	var command = {
		"servo": 0, 
		"value": value
	}
	ws.send(JSON.stringify(command));
});

slider1.on('slide', function(value) {
	var command = {
		"servo": 1, 
		"value": value
	}
	ws.send(JSON.stringify(command));
});

slider2.on('slide', function(value) {
	var command = {
		"servo": 2, 
		"value": value
	}
	ws.send(JSON.stringify(command));
});

slider3.on('slide', function(value) {
	var command = {
		"servo": 3, 
		"value": value
	}
	ws.send(JSON.stringify(command));
});

slider12.on('slide', function(value) {
	var command = {
		"servo": 12, 
		"value": value
	}
	ws.send(JSON.stringify(command));
});

slider13.on('slide', function(value) {
	var command = {
		"servo": 13, 
		"value": value
	}
	ws.send(JSON.stringify(command));
});

slider14.on('slide', function(value) {
	var command = {
		"servo": 14, 
		"value": value
	}
	ws.send(JSON.stringify(command));
});

slider15.on('slide', function(value) {
	var command = {
		"servo": 15, 
		"value": value
	}
	ws.send(JSON.stringify(command));
});

