const express = require("express");
const passport = require("../auth/passport");
const apolloServer = require("./apollo");
const connectDB = require("../data/connectDB");
const session = require("express-session");
const cors = require(`cors`);

const app = express();

// connect DB
connectDB();

app.use(cors());

app.use(
  session({
    secret: process.env.LOCAL_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.json());

passport(app);

apolloServer.applyMiddleware({ app });

app.get("/", (req, res) => {
  console.log("***REQ SESSION***\n", req.session);
  if (req.isAuthenticated()) {
    console.log("***REQ USER***\n", req.user);
    return res.json({message: "AUTHENTICATED", success: true, user: req.user});
  }
  
  res.status(401).json({message: "API WORKING! NOT AUTHENTICATED", success: false});
});

module.exports = app;
