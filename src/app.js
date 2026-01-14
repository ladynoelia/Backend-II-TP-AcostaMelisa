import express from "express";
import usersRouter from "./routes/users.router.js";
import connectMongoDB from "./db/mongo.connection.js";
import cookieParser from "cookie-parser";
import session from "express-session";
//import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import {engine} from "express-handlebars";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import passport from "passport";
import {initializePassport} from "./config/passport.config.js";

const app = express();

//const fileStorage = FileStore(session);

//Middlewares
app.use(express.json());
//app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Cookie-parser
app.use(cookieParser());
//File storage
app.use(session({
  //store: new fileStorage({path:"./sessions", ttl:100, retries: 0}),
  store: new MongoStore({
    autoRemove:"interval",
    autoRemoveInterval: 5,
    mongoUrl: "mongodb+srv://kabigon:coderProyect04@fuwafuwa-cluster.mqb615u.mongodb.net/fuwaEcommerce?appName=fuwafuwa-cluster",
    //mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 15
  }),
  secret: "secretodecookieuwu",
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 1000*60
  }
}))

//Router
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.listen(3030, () => {
  console.log("Servidor iniciado!");
  connectMongoDB().then(() => console.log("Base de datos conectada xD"));
});

//nodemon ./src/app.js
