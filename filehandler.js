//importa a biblioteca filesystem do Node, que lida com manipulação de arquivos e diretórios, sendo responsável por quase todo o trabalho de nosso módulo.
var fs = require('fs');

module.exports = function (filename, sucessFn, errorFn) {//nome do arquivo q vai ser lido, callback de sucesso, callback de falha
	/*Este recebe uma string como primeiro argumento, contendo o caminho e nome do arquivo a ser lido
	  o segundo argumento é uma função de callback que recebe outros dois argumentos: um objeto de erro e os bytes do arquivo lido, caso a leitura seja bem sucedida.*/
	fs.readFile(filename, function (err, data) { //método da biblioteca filesystema
		if (err) {
			errorFn(err);
		} else {
			sucessFn(data)
		}
	});
}