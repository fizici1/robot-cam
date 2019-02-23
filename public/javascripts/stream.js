document.getElementById('stream').className= 'active';


var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

var wsavc = new WSAvcPlayer(canvas, "webgl");

var protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
wsavc.connect(protocol + '//' + window.location.host + '/video-stream');
