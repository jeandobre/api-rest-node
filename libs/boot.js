module.exports = app => {

	const env = process.env.NODE_ENV;

	if(env != "test "){
		app.db.sequelize.sync().done(() => {
			app.listen(app.get("port"), () => {
				console.log(`NTask API - porta ${app.get("port")}`)
			});
		});
	}	
};