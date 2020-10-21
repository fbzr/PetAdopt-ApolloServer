const express = require("express");
const passport = require("../auth/passport");
const apolloServer = require("./apollo");

const app = express();

app.get("/", (req, res) => {
  res.send("API WORKING!");
});

app.use(passport.initialize());

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    // res.redirect('/');
    res.send("LOGGED IN with FACEBOOK");
  },
);

apolloServer.applyMiddleware({ app });

module.exports = app;
