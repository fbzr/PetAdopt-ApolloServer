const express = require("express");
const passport = require("../auth/passport");
const apolloServer = require("./apollo");
const connectDB = require("../data/connectDB");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require(`cors`);

const app = express();

// connect DB
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:4200",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.LOCAL_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

passport(app);

app.use("/graphql", (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "content-type, authorization, content-length, x-requested-with, accept, origin"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Allow", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

apolloServer.applyMiddleware({ app });

app.get("/", (req, res) => {
  console.log("***REQ SESSION***\n", req.session);
  if (req.isAuthenticated()) {
    console.log("***REQ USER***\n", req.user);
    return res.json({
      message: "AUTHENTICATED",
      success: true,
      user: req.user,
    });
  }

  res
    .status(401)
    .json({ message: "API WORKING! NOT AUTHENTICATED", success: false });
});

module.exports = app;
