import { IRoute } from "../types/fastify";
import Controller from "./controller";

const routes: IRoute[] = [
	{
		method: "POST",
		url: "/evaluations",
		handler: Controller.getParams
	}
];

export default routes;
