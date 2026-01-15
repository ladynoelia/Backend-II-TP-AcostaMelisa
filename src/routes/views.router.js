import { Router } from "express";
import passport from "passport";

const viewsRouter = Router();

viewsRouter.get("/login", async (req, res, next) => {
  try {
    res.render("login.handlebars");
  } catch (error) {
    console.log(error);
  }
});

viewsRouter.use(passport.authenticate("jwt", { session: false }));

viewsRouter.get("/profile", async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  }
  const { first_name, last_name, age, email, role } = req.user;
  try {
    res.render("profile.handlebars", {
      first_name,
      last_name,
      age,
      email,
      role,
    });
  } catch (error) {
    console.log(error);
  }
});

export default viewsRouter;
