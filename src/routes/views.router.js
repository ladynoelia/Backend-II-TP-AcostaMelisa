import { Router } from "express";
import passport from "passport";
import {
  renderAdmin,
  renderFailureRegister,
  renderForgotPassword,
  renderHome,
  renderLogin,
  renderLoginFailure,
  renderProfile,
  renderRegister,
  renderResetPassword,
} from "../controllers/views.controller.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";

const viewsRouter = Router();

//Home
viewsRouter.get("/", renderHome);

//Vista protegida
viewsRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  renderAdmin,
);

viewsRouter.get("/login", renderLogin);

viewsRouter.get("/login-failure", renderLoginFailure);

viewsRouter.get("/register", renderRegister);

viewsRouter.get("/failure-register", renderFailureRegister);

viewsRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  renderProfile,
);

viewsRouter.get("/reset-password", renderResetPassword);

viewsRouter.get("/forgot-password", renderForgotPassword);

export default viewsRouter;
