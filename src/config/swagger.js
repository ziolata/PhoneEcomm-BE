import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "PhoneEcomm-BE",
			version: "1.0.0",
			description:
				"Hệ thống Phone Ecommerce. Truy cập Swagger UI để test trực tiếp API ",
		},

		servers: [
			{
				url: `${process.env.HOST}:${process.env.PORT}`,
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup;
