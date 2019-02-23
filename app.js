process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  console.log(err.stack);
});

//modules
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var wss = require('express-ws')(app);
var raspividStream = require('raspivid-stream');

var GrovePi = require('node-grovepi').GrovePi
var Board = GrovePi.board
var Commands = GrovePi.commands
var DHTDigitalSensor = GrovePi.sensors.DHTDigital
var makePwm = require( "adafruit-pca9685" );


var dhtSensor = new DHTDigitalSensor(8, DHTDigitalSensor.VERSION.DHT22, DHTDigitalSensor.CELSIUS)
var pwm = makePwm({"freq" : 50, "correctionFactor" : 1.118});

var initBoard = 0;

//config server
app.set('view engine', 'pug')
app.use(express.static('public'));

//routes
app.get('/', function(req, res) {
  res.render('accueil');
});

app.get('/capteur', function(req, res) {
  res.render('capteur');
});


app.get('/controle', function(req, res) {
  res.render('controle');
});

app.get('/stream', function(req,res) {
  res.render('stream');
});

app.ws('/capteur', (ws, req) => {
  console.log('DHT Sensor (start stream)')
  dhtSensor.stream(1000, function(data) {
    console.log(data);
    ws.send(JSON.stringify(data));
  });
  
  ws.on('message', (msg) => {
    console.log(msg);
  });
  
  ws.onclose = function () {
    dhtSensor.stopStream();
  };
});

app.ws('/controle', (ws, req) => {
  ws.onmessage = function(event) {
    var command = JSON.parse(event.data);
    console.log(command.servo);
    console.log(command.value);
    pwm.setPwm(command.servo, 0, command.value);
  };
});

app.ws('/video-stream', (ws, req) => {
    console.log('Client connected');
    

    ws.send(JSON.stringify({
      action: 'init',
      width: '320',
      height: '210'
    }));

    var videoStream = raspividStream({ rotation: 180 });

    videoStream.on('data', (data) => {
        ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
    });

    ws.on('close', () => {
        console.log('Client left');
        
        videoStream.removeAllListeners('data');
    });
});

function start() {
  console.log('starting')

  board = new GrovePi.board({
    debug: true,
    onError: function(err) {
      console.log('TEST ERROR')
    },
      
    onInit: function(res) {
        console.log("OnInit");
        if (res) {
            
        }
    }
  })

  board.init();
} 

function onExit(err) {
  console.log('ending')
  board.close()
  process.removeAllListeners()
  process.exit()
  if (typeof err != 'undefined')
    console.log(err)
}

app.use(function (err, req, res, next) {
  console.error(err);
  next(err);
})

start();

app.listen(8080, () => console.log('Server started on 8080'));
process.on('SIGINT', onExit)
