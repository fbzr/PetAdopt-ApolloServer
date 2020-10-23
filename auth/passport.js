const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const UserController = require("../data/controllers/User");

/* The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function. */
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// retrieve the whole object using the id saved in the session
passport.deserializeUser(async function (id, done) {
  let user;
  try {
    user = await UserController.findById(id);

    // user object attaches to the request as req.user
    done(null, user);
  } catch (error) {
    done(error, user);
  }
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
      // console.log("***PROFILE***\n", profile);
      try {
        // find or create user in the Database
        const user = await UserController.findOrCreate({
          facebookId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });

        cb(null, user);
      } catch (error) {
        throw new Error("There was an arror with the Facebook login");
      }
    },
  ),
);

module.exports = passport;
