module.exports = app => {

	const env = process.env.NODE_ENV;
	console.log(env);
	if(env){
		console.log("arquivo de teste");
		return require(`./config.${env.trim()}.js`);
	}
	console.log("arquivo de desenvolvimento");
	return require("./config.development.js");
};