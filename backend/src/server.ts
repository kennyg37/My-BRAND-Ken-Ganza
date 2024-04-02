import mongoose from "mongoose";
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import contactRoutes from "./routes/contactRoutes"

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/portfolio',);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);
app.use('/v1/feedback', contactRoutes);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

export default app;
