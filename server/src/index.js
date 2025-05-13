// src/server.js o index.js
import express from "express";
import cors from "cors";
import router from "./api/endPoints.js";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
dotenv.config();

const app = express();
const port = process.env.PORT;

// Leer certificados SSL
const sslOptions = {
  key: fs.readFileSync(path.resolve("../key.pem")),
  cert: fs.readFileSync(path.resolve("../cert.pem")),
};


// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rutas y archivos estáticos
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello from Express (HTTPS)!");
});

// Crear servidor HTTPS
https.createServer(sslOptions, app).listen(port, "0.0.0.0", () => {
  console.log(`HTTPS Server running on ${process.env.BACKEND_URL}`);
});
