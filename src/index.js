import express from "express";
import apiRoutes from "./api/index.js"
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
const port = process.env.port || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));
app.use("/api", apiRoutes);


// Sanity check
app.get("/ping", (req, res) => {res.send("Pong!")})

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/")
})

app.listen(port, () => {
	console.log(`Express listening on ${port}`)
});