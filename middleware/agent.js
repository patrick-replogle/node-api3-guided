module.exports = requiredAgent => (req, res, next) => {
  const userAgent = req.get("User-Agent").toLowerCase();

  if (!userAgent.includes(requiredAgent)) {
    //calling next with any parameter will the server to throw an internal server error
    return next(new Error(`Must be using ${requiredAgent}`));
  }

  next();
};
