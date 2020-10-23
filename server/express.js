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

// Init passport authentication
app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session());

app.get("/", (req, res) => {
  console.log("***REQ SESSION***", req.session);
  if (req.isAuthenticated()) {
    console.log("***REQ USER***", req.user);
    return res.send("AUTHENTICATED");
  }

  res.send("API WORKING! NOT AUTHENTICATED");
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  },
);

apolloServer.applyMiddleware({ app });

module.exports = app;
