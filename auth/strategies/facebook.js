const FacebookStrategy = require("passport-facebook");
const UserController = require("../../data/controllers/User");

module.exports = () => {
  return new FacebookStrategy(
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
          name: profile.displayName,
          email: profile.emails[0].value,
        });

        cb(null, user);
      } catch (error) {
        throw new Error("There was an arror with the Facebook login");
      }
    },
  );
};
