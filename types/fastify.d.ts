import { FastifyRequest, HTTPMethods, RouteHandlerMethod } from "fastify";

type CustomRequest = FastifyRequest<{
	Body: {
		[key: string]: any;
	};
}>;

interface IRoute {
	method: HTTPMethods;
	url: string;
	handler: RouteHandlerMethod;
}

export { CustomRequest, IRoute };
