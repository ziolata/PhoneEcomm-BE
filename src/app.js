import express from "express";
import { config } from "./database/config";
import cors from "cors";
import { Routers } from "./routes";
import fileUpload from "express-fileupload";
const app = express();
app.use(
	cors({
		origin: process.env.CLIENT,
		methods: ["GET", "POST", "PUT", "DELETE"],
	}),
);
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

Routers(app);

app.listen(config.port, () => {
	console.log("Server đang hoạt động bình thường");
});
export default app;
