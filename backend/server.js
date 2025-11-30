import express from "express";
import mongoose from "mongoose";
import Notesroutes from "./routes/notesRoutes.js";
import Userroutes from "./routes/userRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./controllers/erroHandler.js";
dotenv.config();
const app = express();
const password = process.env.PASSWORD;
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", Notesroutes);
app.use("/api/users", Userroutes);
app.use(errorHandler);
mongoose
	.connect(
		`mongodb+srv://arshadshaik2007:${password}@cluster0.73udxbh.mongodb.net/Notes-data?retryWrites=true&w=majority&appName=Cluster0`
	)
	.then(() => {
		console.log("connected to mongodb atlas");
		app.listen(port, () => {
			console.log(`server started at port ${port}`);
		});
	})
	.catch((error) => {
		console.log(error.message);
	});
