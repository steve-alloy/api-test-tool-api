import { Buffer } from "node:buffer";
import { FastifyReply } from "fastify";
import { CustomRequest } from "../types/fastify";
import axios from "axios";

class Controller {
	async getParams(req: CustomRequest, res: FastifyReply) {
		const { headers, creds, baseURL } = req.body;

		const authorization =
			"Basic " +
			Buffer.from(
				`${creds.workflow_token}:${creds.workflow_secret}`,
				"utf-8"
			).toString("base64");

		const response = await axios.get(baseURL + "/parameters", {
			headers: {
				...headers,
				"Content-Type": "application/json",
				"Authorization": authorization
			}
		});

		const data = response.data;

		const requiredFields = data.required.map(
			(field: { key: string }) => field.key
		);

		const optionalFields = data.optional.map(
			(field: { key: string }) => field.key
		);

		return res.status(200).send({
			requiredFields,
			optionalFields
		});
	}
}

export default new Controller();
