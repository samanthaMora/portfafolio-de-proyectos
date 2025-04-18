import express from "express";
import cors from "cors";
import router from "./api/endPoints.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.resolve("uploads")));

app.use(cookieParser());

app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
