var express = require("express"),
    errorHandler = require('errorhandler'),
    app = express();


var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';


app.use('/', express.static(PUBLIC_DIR));

app.use(function (req) {
	// Здесь нужно написать журналирование в формате
	// [время] [method] uri (* номер запроса по счету)
});

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.listen(PORT, function (argument) {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});
