var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/api/', function(request, response) {
  response.render('pages/api-documentation');
});


//Database
var mysql = require('mysql');
var con = mysql.createConnection(process.env.CLEARDB_DATABASE_URL, true);

app.get('/api/food/menu/get', function(request, response) {
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");

		con.query("SELECT * FROM food_menu", function (err, result, fields) {
			if (err) throw err;
			response.send(result);
		});
	});
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


