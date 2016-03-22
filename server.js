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

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
});
app.get('/users', function (req, res) {
  res.send(myData.users);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});