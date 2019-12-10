var http = require('http'),//Módulo que já vem na biblioteca do node
	config = require('./config'),//config.json
	fileHandler = require('./filehandler'),//importa filehandler.js
	parse = require('url').parse,//separa cada trecho de qualquer URL e retornar um objeto com cada um deles
	types = config.types,//tipo do arquivo solicitado
	rootFolder = config.defaultIndex,//pasta raiz qnd n tiver arquivo específico
	server;

module.exports = server = http.createServer();//isso faz com que o server instanciado possa ser importado em outros arquivos

server.on('request', onRequest);//adicionando o evento request (pré-definido no servido HTTP do Node.js) ao server

function onRequest(req, res) {
	//interpreta o endereço HTTP solicitado pelo browser e o transforma em um objeto JSON
	var filename = parse(req.url).pathname,//desse json, pega o atributo pathname
		fullPath,
		extension;
	if (filename === '/') {//se filename não for nenhum arquivo especificado, leva a página principal
		filename = defaultIndex;
	}
	fullPath = rootFolder + filename;//o caminho completo do arquivo solicitado pelo usuário
	extension = filename.substr(filename.lastIndexOf('.') + 1);// captura apenas a extensão do arquivo solicitado pelo usuário
	fileHandler(fullPath, function (data) {//filehandler é importado do arquivo filehandler.js, recebe caminho do arquivo completo, callback sucesso, callback erro	
		/*O primeiro argumento passado a esse método é o código HTTP (200 quer dizer que a resposta está Ok)
		O segundo argumento é um objeto com informações do cabeçalho HTTP; no caso, o tipo de conteúdo (Content-Type) e o tamanho dos dados em bytes (Content-length).*/
		res.writeHead(200, {//writeHead pertence a res
			'Content-Type': types[extension] || 'text/plain', //define o tipo do conteúdo da resposta
			'Content-Length': data.length //tamanho do arquivo
		});
		res.end(data)
	}, function (err) {
		res.writeHead(404);
		res.end();
	})
}
