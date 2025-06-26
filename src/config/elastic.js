import { Client } from "@elastic/elasticsearch";

export const client = new Client({
	node: process.env.ELASTIC,
	auth: {
		username: process.env.eUser,
		password: process.env.ePass,
	},
});
