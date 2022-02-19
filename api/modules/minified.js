export default {
  script: (url) => {
    return url.split(".").some((elem) => elem.toLowerCase() === "min")
  },
  style: (url) => {
    return url.split(".").some((elem) => elem.toLowerCase() === "min")
  }
}