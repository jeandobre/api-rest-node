module.exports = app => {
	const Tasks = app.db.models.Tasks;
	
	app.route("/tasks")
	.all(app.auth.authenticate())
	/**
	 * @api {get} /tasks Lista de tarefas
	 * @apiGroup Tarefas
	 * @apiHeader {String} Authorization Token de usuário
	 * @apiHeaderExample {json} Header
	 * 	{"Authorization": "JWT xyz.abc.123.hgf"}
	 * @apiSuccess {Object[]} tasks Lista de tarefas
	 * @apiSuccess {Number} tasks.id Id de registro
	 * @apiSuccess {String} tasks.title Título da tarefa
	 * @apiSuccess {Boolean} tasks.done Tarefa foi concluída?
	 * @apiSuccess {Date} tasks.updated_at Data de atualização
	 * @apiSuccess {Date} tasks.created_at Data de cadastro
	 * @apiSuccessExample {json} Sucesso
	 * 	HTTP/1.1 200 OK
	 * 	[{
	 * 		"id": 1,
	 * 		"title": "Estudar",
	 * 		"done": False,
	 * 		"updated_at": "xxxx",
	 * 		"user_id": 1
	 * 	}]
	 * @apiErrorExample {json} Erro de consulta
	 * 	HTTP/1.1 412 Precondition Failed
	 */
	.get((req, res) => {
		Tasks.findAll({
			where: { user_id: req.user.id }
		}).then(tasks => {
			res.json(tasks);
		}).catch(error => {
			res.status(412).json({ msg: error.message });
		})
	})
	.post((req, res) => {
		req.body.user_id = req.user.id;
		Tasks.create(req.body)
		.then(result => res.json(result))
		.catch(error => {
			res.status(412).json({ msg: error.message });
		})
	});

	app.route("/tasks/:id")
	.all(app.auth.authenticate())
	.get((req, res) => {
		Tasks.findOne({ where: {
			id: req.params.id,
			user_id: req.user.id 
			}
		})
		.then(result => {
			if(result){
				res.json(result)
			} else {
				res.sendStatus(404);
			}
		})
		.catch(error => {
			res.status(412).json({ msg: error.message });
		})
	})
	.put((req, res) => {
		Tasks.update(req.body, { 
			where: {
				id: req.params.id,
				user_d: req.user.id
		 	} 
		})
		.then(result => res.sendStatus(204))
		.catch(error => {
			res.status(412).json({ msg: error.message });
		});
	})
	.delete((req, res) => {
		Tasks.destroy({ where: { 
			id: req.params.id, 
			user_id: req.user.id 
		} 
	})
		.then(result => res.sendStatus(204))
		.catch(error => {
			res.status(412).json({ msg: error.message });
		});
	});
};