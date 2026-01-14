function sessionsMiddleware (){
    if (req.sessions.user) {
        res.redirect("/profile");
    } else {
        next();
    }
};

export default sessionsMiddleware;