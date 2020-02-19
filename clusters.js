import cluster from "cluster";
import os from "os";

const CPUS = os.cpus();

if(cluster.isMaster){
	CPUS.forEach(() => cluster.fork());
	cluster.on("listening", worker => {
		console.log("Cluster %d -%d conectado", worker.id, worker.process.pid);
	});

	cluster.on("disconnect", worker => {
		console.log("Cluster %d -%d disconectado", worker.id, worker.process.pid);
	});

	cluster.on("exit", worker => {
		console.log("Cluster %d - %d saiu do ar", worker.id, worker.process.pid);
		cluster.fork();
	});
} else {
	require("./index.js");
}