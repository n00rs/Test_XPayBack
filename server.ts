import express, { Express } from "express";
import { join } from "path";
import cors from "cors";
import authRoutes from "./routes/auth.router";
import imgRoutes from "./routes/image.router";
import { verifyAccessToken } from "./utlis/authMiddleware";
const app: Express = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(join(__dirname, "public"))); //for serving images

app.use("/api/auth", authRoutes);
app.use(verifyAccessToken);
app.use("/api/image", imgRoutes);

app.use((err, req, res, next) => {
  console.error(err, "-------------");
  const statusCode = err.statusCode ? err.statusCode : 400;
  res.status(statusCode).json(err);
});

app.listen(PORT, () => console.log(`Server is listening at port:${PORT}`));
