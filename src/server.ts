import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import session from "express-session";

import { connectDB } from "./config/database.js";

import productRouter from "./routes/product-route.js";
import router from "./routes/user-route.js";
import User from "./model/user-model.js";

// Razorpay makes a POST call to the callback URL with the razorpay_payment_id, razorpay_order_id and razorpay_signature in the response object of the successful payment. Only successful authorisations are auto-submitted.

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// use the session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET!, // session secret
    resave: false,
    saveUninitialized: false,
  }),
);
//initilize
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },

    // returns the authenticated email profile
    async function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any,
    ) {
      try {
        const existUser = await User.findOne({
          googleId: profile.id,
        });
        if (!existUser) {
          const newUser = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            picture: profile.photos[0].value,
            googleId: profile.id,
            provider: "google",
          });
          return done(null, newUser);
        }
        return done(null, existUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

// function to serialize a user/profile object into the session
passport.serializeUser(function (user: any, done) {
  done(null, user?._id);
});

// function to deserialize a user/profile object into the session
passport.deserializeUser(async function (userInfo: any, done) {
  try {
    const user = await User.findById(userInfo._id);
    if (!user) {
      return done(new Error("User not found"), null);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.use(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/login",
  }),
);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
});

app.use("/api/users", router);
app.use("/api/products", productRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});




/**
 * 
 * // 1. set end time
const endTime = Date.now() + duration;

// 2. on every tick (every ~1 sec)
const remaining = endTime - Date.now();

// 3. clamp — never show negative
const display = Math.max(0, remaining);

// 4. pause — just save remaining
pausedAt = remaining;

// 5. resume — rebuild endTime
endTime = Date.now() + pausedAt;
 */