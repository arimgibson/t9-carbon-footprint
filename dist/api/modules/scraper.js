import puppeteer from "puppeteer";
import isMinified from "./optimizations/minified.js";
import isCompressed from "./optimizations/compressed.js";
import imageTypes from "./optimizations/imageTypes.js";
import isHTTPError from "./optimizations/HTTPError.js"

export async function checkOptimizations(url) {
  url = "https://" + url;
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send("Network.enable");

  let data = {};

  client.on("Network.responseReceived", async ({ requestId, timestamp, type, response }) => {
    let filename;
    let file = response.url.substring(response.url.lastIndexOf("/") + 1).toLowerCase();
    if (file.indexOf("?") < 0) filename = file;
    else filename = file.substring(0, file.indexOf("?"));

    if (filename === "%3e") return;
    else if (!filename) filename = "index.html";

    type = type.toLowerCase();
    data[requestId] = {};
    let slot = data[requestId];

    slot.filename = filename;
    slot.timestamp = timestamp;
    slot.type = type;

    // 400 Errors?
    if (response.status >= 400 && response.status < 500) {
      slot.HTTPError = isHTTPError(response.status, response.statusText);
    } else {
      slot.HTTPError = false;
    }

    // Minified?
    switch (type) {
      case "script":
        slot.minified = await isMinified.script(filename, response.url);
        break;
      case "stylesheet":
        slot.minified = await isMinified.style(filename, response.url);
        break;
      default:
        slot.minified = "n/a";
    }

    // Efficient Image Types?
    if (type === "image") {
      slot.image = await imageTypes(filename);
    } else {
      slot.image = null;
    }

    // Compressed?
    if (
      !filename.split(".").slice(-1)[0].startsWith("woff") &&
      response.headers &&
      ["document", "stylesheet", "image", "media", "font", "script"].includes(type)
    ) {
      slot.compressed = await isCompressed(response.headers);
    } else {
      slot.compressed = null;
    }
  });

  client.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
    if (encodedDataLength < 1000) delete data[requestId];
    if (data[requestId]) data[requestId].size = encodedDataLength;
  });

  await page.goto(url, { waitUntil: "networkidle0" });
  await browser.close();

  return data;
}
