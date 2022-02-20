import express from "express";
import apiRoutes from "./api/index.js"
// import * as render from "./views/renders.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));
app.use("/api", apiRoutes);

// Sanity check
app.get("/ping", (req, res) => {res.send("Pong!")})

app.get("/", (req, res) => {
	// render.home(res);
	res.sendFile(__dirname + "/public/")
})

app.listen(port, () => {
	console.log(`Express listening on ${port}`)
});