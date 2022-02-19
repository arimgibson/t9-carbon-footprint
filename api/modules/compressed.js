export default (headers) => {
  if (!headers["content-encoding"]) return "none"
  let method = headers["content-encoding"].toLowerCase()
  return method === "br" ? "br" : (method === "gzip" ? "gzip" : "none")
}