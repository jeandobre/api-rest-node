module.exports = {
	database: "ntask",
	username: "",
	password: "",
	params: {
		dialect: "sqlite",
		storage: "ntask.sqlite",
		define: {
			underscored: true
		}
	},
	jwtSecret: "Nta$k-Ap1",
	jwtSession: { session: false }
};