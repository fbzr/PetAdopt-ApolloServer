const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

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

// FACEBOOK Strategy
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

module.exports = passport;
