function requireUser(req, res, next) {
  if (!req.user) {
    next(JSON.stringify({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    }));
  }

  next();
}

module.exports = {
  requireUser
}