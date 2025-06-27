import express from "express";
import cors from "cors";
import { Routers } from "./routes/index.js";
import fileUpload from "express-fileupload";
import compression from "compression";
import { errorHandler } from "./middleware/error-handle-middleware.js";
import { swaggerServe, swaggerSetup, swaggerSpec } from "./config/swagger.js";

// import cluster from "cluster";
// import os from "os";
const app = express();
//
// if (cluster.isPrimary) {
// 	const numCPUs = os.cpus().length;
// 	console.log(`${process.pid} đang hoạt động`);

// 	for (let i = 0; i < numCPUs; i++) {
// 		cluster.fork();
// 	}

// 	cluster.on("exit", (worker, code, signal) => {
// 		console.log(` ${worker.process.pid} ngừng hoạt động`);
// 		cluster.fork();
// 	});
// } else {
// 	app.use(
// 		cors({
// 			origin: process.env.CLIENT,
// 			methods: ["GET", "POST", "PUT", "DELETE"],
// 		}),
// 	);
// 	app.use(express.json());
// 	app.use(express.urlencoded({ extended: true }));
// 	app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
// app.use(compression());
// 	Routers(app);
// 	app.listen(config.port, () => {
// 		console.log("Server đang hoạt động bình thường");
// 	});
// }
app.use(
	cors({
		origin: process.env.CLIENT,
		methods: ["GET", "POST", "PUT", "DELETE"],
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(compression());
app.use("/api-docs", swaggerServe, swaggerSetup(swaggerSpec));
Routers(app);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log("Server đang hoạt động bình thường");
});

export default app;
