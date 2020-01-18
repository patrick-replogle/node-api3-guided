//custom logger midpoints
//type parameter is optional, but allow us return different versions of log like the morgan middleware
module.exports = type => (req, res, next) => {
  if (type === "long") {
    console.log(
      `${req.ip} - ${req.protocol} - ${req.method} - ${req.url} - ${req.get(
        "User-Agent"
      )}`
    );
  } else if (type === "short") {
    console.log("...something");
  }
  next();
};
