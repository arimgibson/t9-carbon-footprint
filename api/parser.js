export default {
  normal: (data) => {
    let keysToKeep = [];
    let returnValue = {};
    for (let key in data) {
      let d = data[key];
      if (!d.minified || d.compressed === "none" || d.HTTPError || (d.image && d.size >= 300000)) keysToKeep.push(key)
    };
    keysToKeep.forEach((key) => {
      returnValue[key] = data[key]
    })

    return [returnValue, keysToKeep.length];
  },
  paranoid: (data) => {
    let keysToKeep = [];
    let returnValue = {};
    for (let key in data) {
      let d = data[key];
      if (!d.minified || d.compressed !== "br" || d.HTTPError || (d.image && (!["jpg", "jpeg", "webp"].includes(d.imageType) || d.size >= 100000))) keysToKeep.push(key)
    };
    keysToKeep.forEach((key) => {
      returnValue[key] = data[key]
    })

    return [returnValue, keysToKeep.length];
  },
};