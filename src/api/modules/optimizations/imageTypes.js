export default (file) => {
  let segments = file.split(".");
  return segments[segments.length - 1]
}