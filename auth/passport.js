const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const UserController = require("../data/controllers/User");

/* The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function. */
passport.serializeUser(function (user, done) {
  // done(null, user.id);

  // saving the whole user object just for test
  done(null, user.id);
});

// receiving the whole user just for test
// retrieve the whole object using the id saved in the session
passport.deserializeUser(async function (id, done) {
  let user;
  try {
    user = await UserController.findById(id);

    console.log(`Deserialize user.\nId: ${id}\nUser: ${user}`);

    done(null, user);
  } catch (error) {
    done(error, user);
  }

  // done(new Error("There was an error during deserializeUser"), user);
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
  // console.log(`Deserialize user.\nUser: ${user}`);
  // done(err, user);
});

// FACEBOOK Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        `${process.env.APP_URL}/auth/facebook/callback` ||
        "http://localhost:5000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("***PROFILE***\n", profile);

      try {
        const user = await UserController.findOrCreate({
          facebookId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });

        console.log("***USER FOUND OR CREATED***\n", user);
        cb(null, user);
      } catch (error) {
        console.log(error);
      }

      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    },
  ),
);

module.exports = passport;
