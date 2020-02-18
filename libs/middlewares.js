import bodyParser from "body-parser";

module.exports = app => {
	//Apenas para formatar o json e facilitar a visualização
	//app.set("json spaces", 4);
	app.set("port", 8080);
	app.use(bodyParser.json());
	app.use(app.auth.initialize());
	app.use((req, res, next) => {
		//middleware de pré-execução das rotas
		delete req.body.id;
		next();
	});
};