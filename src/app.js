import express from "express";
import usersRouter from "./routes/users.router.js";
import connectMongoDB from "./db/mongo.connection.js";
import cookieParser from "cookie-parser";
import session from "express-session";
//import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

//const fileStorage = FileStore(session);

//Middlewares
app.use(express.json());
//app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Cookie-parser
app.use(cookieParser());

//File storage en MongoDB
app.use(
  session({
    //store: new fileStorage({path:"./sessions", ttl:100, retries: 0}),
    store: MongoStore.create({
      autoRemove: "interval",
      autoRemoveInterval: 5,
      mongoUrl: process.env.MONGODB,
      //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "secretodecookieuwu",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60,
    },
  })
);

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

app.listen(8080, () => {
  console.log("Servidor iniciado!");
  connectMongoDB().then(() => console.log("Base de datos conectada xD"));
});
