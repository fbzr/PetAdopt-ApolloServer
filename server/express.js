const express = require("express");
const passport = require("../auth/passport");
const apolloServer = require("./apollo");
const connectDB = require("../data/connectDB");
const session = require("express-session");
const cors = require(`cors`);

const app = express();

// connect DB
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:4200",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.LOCAL_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

passport(app);

apolloServer.applyMiddleware({ app, cors: false });

app.get("/", (req, res) => {
  console.log("***REQ SESSION***\n", req.session);
  if (req.isAuthenticated()) {
    console.log("***REQ USER***\n", req.user);
    return res.json({
      message: "AUTHENTICATED",
      success: true,
      user: req.user,
    });
  }

  res
    .status(401)
    .json({ message: "API WORKING! NOT AUTHENTICATED", success: false });
});

module.exports = app;
