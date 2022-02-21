import express from "express";
import apiRoutes from "./api/index.js"
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

app.get("/assets/index.c977734c.js", (req, res) => {
	res.sendFile(__dirname + "/assets/index.c977734c.js")
})

app.get("/assets/index.aeb3b8c4.css", (req, res) => {
	res.sendFile(__dirname + "/assets/index.aeb3b8c4.css")
})

app.get("/assets/vendor.7d0c9bf9.js", (req, res) => {
	res.sendFile(__dirname + "/assets/vendor.7d0c9bf9.js")
})

app.listen(port, () => {
	console.log(`Express listening on ${port}`)
});