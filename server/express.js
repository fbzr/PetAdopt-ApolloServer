const express = require("express");
const passport = require("../auth/passport");
const apolloServer = require("./apollo");
const connectDB = require("../data/connectDB");
const session = require("express-session");

const app = express();

// connect DB
connectDB();

app.use(
  session({
    secret: process.env.LOCAL_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

passport(app);

app.get("/", (req, res) => {
  console.log("***REQ SESSION***", req.session);
  if (req.isAuthenticated()) {
    console.log("***REQ USER***", req.user);
    return res.send("AUTHENTICATED");
  }

  res.send("API WORKING! NOT AUTHENTICATED");
});

apolloServer.applyMiddleware({ app });

module.exports = app;
