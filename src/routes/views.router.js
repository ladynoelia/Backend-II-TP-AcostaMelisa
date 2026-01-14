import { Router } from "express";
import sessionsMiddleware from "../middlewares/sessions.middlewares.js";

const viewsRouter = Router ();

//viewsRouter.use(sessionsMiddleware);

viewsRouter.get ("/login", sessionsMiddleware, async (req, res, next) => {
    try {
     res.render("login.handlebars");
    } catch (error) {
        
    }
});

viewsRouter.get ("/profile", async (req, res, next) => {    
    if (!req.session.user) {
        res.redirect("/login");
    }
    const {first_name, last_name, age, email} = req.session.user;
    try {
        res.render("profile.handlebars"), {
            first_name, last_name, age, email
        };
    } catch (error) {
        
    }
});

export default viewsRouter;