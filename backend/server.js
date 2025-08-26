import express from "express";
import mongoose from "mongoose";
import Notesroutes from "./routes/notesRoutes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", Notesroutes);

mongoose
  .connect(
    "mongodb+srv://arshadshaik2007:rjcsdmsmsm@cluster0.73udxbh.mongodb.net/Notes-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to mongodb atlas");
    app.listen(8000, () => {
      console.log("server started at port 8000");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
