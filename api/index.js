import express from "express";
import { checkOptimizations } from "./scrapper.js";
import dataParser from "./parser.js";

const app = express();
const port = 3929;

app.get('/', (req, res) => {
  console.log("Got request")
  res.send('Hello World!')
})

// Gives information about *all* resources requested by your site. Provides the most in-depth data
app.get("/api/:site/all", async (req, res) => {
  console.log("Request to API: All");
  let data = await checkOptimizations(req.params.site);
  res.json(data);
})


/*
Gives an overview of the more significant concerns. Situations where:
- Unminified CSS and JS
- Files with no form of compression
- Images over 300kb
- Requests that encounter a 4xx HTTP Error
*/
app.get("/api/:site", async (req, res) => {
  console.log("Request to API: Normal");
  let data = await checkOptimizations(req.params.site);
  res.json(dataParser.normal(data))
})


/*
Flags all areas of concern that are not following best possible practices. Situations where:
- Unminified CSS and JS
- Files with gzip or no compression
- Images over 100kb
- Images that are not JPG or WEBP
- Requests that encounter a 4xx HTTP Error
*/
app.get("/api/:site/paranoid", async (req, res) => {
  console.log("Request to API: Paranoid");
  let data = await checkOptimizations(req.params.site);
  res.json(dataParser.paranoid(data))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})