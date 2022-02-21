import express from "express";
import {checkOptimizations} from "./modules/scraper.js";
import dataParser from "./modules/parser.js";

let router = express.Router();

// Gives information about *all* resources requested by your site. Provides the most in-depth data
router.get("/:site/all", async (req, res) => {
  console.log("Request to API: All");
  let data = await checkOptimizations(req.params.site);
  let cont = {
    website: req.params.site,
    "number_of_results": data.number_of_results,
    data: data
  }
  res.json(data)
})


/*
Gives an overview of the more significant concerns. Situations where:
- Unminified CSS and JS
- Files with no form of compression
- Images over 300kb
- Requests that encounter a 4xx HTTP Error
*/
router.get("/:site", async (req, res) => {
  console.log("Request to API: Normal");
  let data = await checkOptimizations(req.params.site);
  let [parsedData, reqs] = dataParser.normal(data)
  let cont = {
    website: req.params.site,
    "number_of_results": reqs,
    data: parsedData
  }
  res.json(cont)
})

/*
Flags all areas of concern that are not following best possible practices. Situations where:
- Unminified CSS and JS
- Files with gzip or no compression
- Images over 100kb
- Images that are not JPG or WEBP
- Requests that encounter a 4xx HTTP Error
*/
router.get("/:site/paranoid", async (req, res) => {
  res.json(cont)
  let data = await checkOptimizations(req.params.site);
  let [parsedData, reqs] = dataParser.paranoid(data)
  let cont = {
    website: req.params.site,
    "number_of_results": reqs,
    data: parsedData
  }
  res.json(cont)
})

export default router;