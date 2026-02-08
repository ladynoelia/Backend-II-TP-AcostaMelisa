import express from "express";
import { env } from "./config/environment.js";
import cookieParser from "cookie-parser";
//import session from "express-session";
//import FileStore from "session-file-store";
//import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";

import usersRouter from "./routes/users.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";

import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

import MongoSingleton from "./config/mongo.js";

const app = express();

//const fileStorage = FileStore(session);

//Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Cookie-parser
app.use(cookieParser());

//File storage en MongoDB
/* app.use(
  session({    
    store: MongoStore.create({
      autoRemove: "interval",
      autoRemoveInterval: 5,
      mongoUrl: env.MONGODB,
      //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "secretodecookieuwu",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60,
    },
  }),
); */

//Passport
initializePassport();
app.use(passport.initialize());
//app.use(passport.session());

//Router
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.listen(env.PORT, () => {
  console.log("Servidor iniciado!");
  MongoSingleton.getInstance();
});
