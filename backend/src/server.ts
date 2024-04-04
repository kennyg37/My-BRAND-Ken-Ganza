import mongoose from "mongoose";
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import contactRoutes from "./routes/contactRoutes"
import detailsRoutes from "./routes/profileRoutes";
import subRoutes from "./routes/subRoutes";

const app = express();
const PORT = 4000;

mongoose.connect('mongodb+srv://kennyg37:ganzaken8@cluster0.67bal4c.mongodb.net/Mybrand',);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);
app.use('/v1/feedback', contactRoutes);
app.use('/v1/profile', detailsRoutes);
app.use('/v1/subscribe', subRoutes);

let server: any;

export const startServer = () => {
  server = app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
  return server;
}

export const closeServer = () => {
  server.close();
}
if (require.main === module) {
    startServer();
}

export default app;
