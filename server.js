var express = require('express');
var Firebase = require('firebase');

var app = express();

var myFirebaseRef = new Firebase("https://bbva-feedback.firebaseio.com/");

var myData = {
	users: null,
	data: null
};

myFirebaseRef.child('users').on('value', function(snap){
	myData.users = snap.val();
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static(__dirname + '/public')); //Esto es un comentario de prueba

app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
});
app.get('/users', function (req, res) {
  res.send(myData.users);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
