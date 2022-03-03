import fastify from "fastify";
import routes from "./src/routes";

const app = fastify({
	logger: true
});

routes.forEach((route) => {
	app.route(route);
});

app.listen(3000, (err, addr) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	} else {
		console.log(addr);
	}
});
