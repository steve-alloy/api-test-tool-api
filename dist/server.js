"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const node_buffer_1 = require("node:buffer");
const fastify_1 = __importDefault(require("fastify"));
const axios_1 = __importDefault(require("axios"));
const testObj = {
	headers: {
		"Alloy-Application-Version": 2
	},
	body: {
		name_first: "Steve"
	},
	creds: {
		workflow_token: "OCUtk2ZGVdYE5yV0RS6gqgI4RA0fm77R",
		workflow_secret: "hDIjh1r21KXsaWPWJJqlIueR1EFhBw1N"
	},
	baseURL: "https://stagingsandbox.alloy.co/v1"
};
const authorization =
	"Basic " +
	node_buffer_1.Buffer.from(
		`${testObj.creds.workflow_token}:${testObj.creds.workflow_secret}`,
		"utf-8"
	).toString("base64");
const getParams = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		console.log(authorization);
		const { headers, body, creds, baseURL } = testObj;
		const response = yield axios_1.default.get(baseURL + "/parameters", {
			headers: {
				"Content-Type": "application/json",
				"Authorizaton": authorization
			}
		});
		return res.status(200).send({
			data: response.data
		});
	});
const routes = [
	{
		method: "POST",
		url: "/evaluations",
		handler: getParams
	}
];
const app = (0, fastify_1.default)({
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
//# sourceMappingURL=server.js.map
