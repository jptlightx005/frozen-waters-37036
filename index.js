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

app.get('/api', function(request, response) {
  response.render('pages/api-documentation', {
  					page : 'home'
  					});
});

app.get('/api/food', function(request, response) {
  response.render('pages/api-documentation/food-api', {
  					title : 'Food',
  					page : 'food'
  					});
});

//Database
var mysql = require('mysql');
var con = mysql.createConnection(process.env.CLEARDB_DATABASE_URL, true);

app.get('/api/food/menu/get', function(request, response) {
	con.query("SELECT * FROM food_menu", function (err, result, fields) {
		if (err) throw err;
		response.send(result);
	});
});

//Helpers
app.locals.isAPIPageActive = function(page, name) {
	if(typeof page !== 'undefined'){
		if(page != '' && name != ''){
			if(page == name){
				return true;
			}
		}
	}
	return false;
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


