import fetch from "node-fetch";

export default {
  script: async (url, fullURL) => {
    if (url.split(".").some((elem) => elem.toLowerCase() === "min")) return true;
    else {
      let file = await fetch(fullURL);
      let fileCont = await file.text();

      if (!fileCont.match(/\n/)) return true;
      fileCont = fileCont.substring(0, 500);
      if (fileCont.match(/\(function\(||\"use strict\"/i)) return true;
      else return false;
    }
  },
  style: async (url, fullURL) => {
    if (url.split(".").some((elem) => elem.toLowerCase() === "min")) return true;
    else {
      let file = await fetch(fullURL);
      let fileCont = await file.text();

      if (!fileCont.match(/\n/)) return true;
      fileCont = fileCont.substring(0, 500);
      if (fileCont.match(/[A-z]:[0-z]/i)) return true;
      else return false;
    }
  },
};
