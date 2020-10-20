require("dotenv").config();
const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

const { ApolloServer } = require("apollo-server");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");
const getUser = require("../auth/user");

const app = express();

app.use(passport.initialize());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        `${process.env.APP_URL}/auth/facebook/callback` ||
        "http://localhost:5000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });

      console.log(profile);
      cb(() => console.log("error"), profile);
    },
  ),
);

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";

    // try to retrieve a user with the token
    const user = getUser(token);

    // add the user to the context
    return { user };
  },
});

server.applyMiddleware({ app });

module.exports = app;
