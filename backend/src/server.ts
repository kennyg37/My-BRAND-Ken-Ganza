import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import auth from "./models/auth";
import authRoutes from "./routes/authRoutes";
import blog from "./models/blog";
import blogRoutes from "./routes/blogRoutes";

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/portfolio',);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
