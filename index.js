require("dotenv").config();
const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();

app.use(passport.initialize());

/* The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function. */
passport.serializeUser(function (user, done) {
  // done(null, user.id);

  // saving the whole user object just for test
  done(null, user);
});

// passport.deserializeUser(function (id, done) {
// receiving the whole user just for test
passport.deserializeUser(function (user, done) {
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
  console.log(`Deserialize user.\nUser: ${user}`);
  done(err, user);
});

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
      cb(null, profile);
    },
  ),
);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

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

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     // get the user token from the headers
//     const token = req.headers.authorization || "";

//     // try to retrieve a user with the token
//     // for test
//     const user = {
//       username: "fabricio",
//     };

//     // const user = getUser(token);

//     // add the user to the context
//     return { user };
//   },
// });

const apolloServer = require("./graphql");

apolloServer.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
