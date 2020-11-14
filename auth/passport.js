const passport = require("passport");
const UserController = require("../data/controllers/User");
const facebook = require("./strategies/facebook");

module.exports = (app) => {
  // Init passport authentication
  app.use(passport.initialize());
  // Persistent login sessions
  app.use(passport.session());

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
  passport.use(facebook());

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: `/success`,
      failureRedirect: `${process.env.CLIENT_URL}/login`,
    })
  );

  app.get("/success", (req, res) => {
    // add headers here
    res.header("Access-Control-Allow-Origin", "*");
    res.redirect(`${process.env.CLIENT_URL}`);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  });
};
