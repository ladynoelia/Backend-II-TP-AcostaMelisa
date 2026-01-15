function sessionsMiddleware(req, res, next) {
  if (req.sessions.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

export default sessionsMiddleware;
