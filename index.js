process.title = 'MyWebServer';
var args = process.argv,//pegar o que foi digitado no terminal
	port = args[2] || 7070,//definindo a porta como a passada no terminal. Se não houver, chamar 7070
	webServer = require('./server');//referencia para o server, que está em server.js
webServer.listen(port, function () {
	//callback quando o server tiver funcionando
	console.log('Server started at port ' + port)
})