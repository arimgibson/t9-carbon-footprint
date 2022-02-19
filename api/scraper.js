import puppeteer from "puppeteer";
import isMinified from "./modules/minified.js";
import isCompressed from "./modules/compressed.js";
import imageTypes from "./modules/imageTypes.js";

export async function checkOptimizations(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send("Network.enable");

  let data = {};

  client.on("Network.responseReceived", ({ requestId, timestamp, type, response }) => {
      let filename;
      let file = response.url.substring(response.url.lastIndexOf("/") + 1).toLowerCase();
      if (file.indexOf("?") < 0) filename = file;
      else filename = file.substring(0, file.indexOf("?"));

    type = type.toLowerCase();
    data[requestId] = {};
    let slot = data[requestId];

    slot.filename = filename;
    slot.timestamp = timestamp;
    slot.type = type;

    // Minified?
    switch (type) {
      case "script":
        slot.minified = isMinified.script(filename);
        break;
      case "stylesheet":
        slot.minified = isMinified.style(filename);
        break;
      default:
        slot.minified = null;
    }

    // Compressed?
    if (response.headers && ["document", "stylesheet", "image", "media", "font", "script"].includes(type)) {
      slot.compressed = isCompressed(response.headers);
    } else {
      slot.compressed = null;
    }

    // Efficient Image Types?
    if (type === "image") {
      slot.image = imageTypes(filename)
    } else {
      slot.image = null;
    }

    // 400 Errors?
    if (response.status >=400 && response.status < 500) {
      slot.HTTPError = isHTTPError(response.status, response.statusText);
    } else {
      slot.HTTPError = false
    }
  });

  
  client.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
    data[requestId].size = encodedDataLength;
  });

  await page.goto(url, { waitUntil: "networkidle0" });
  await browser.close();

  return data
}
