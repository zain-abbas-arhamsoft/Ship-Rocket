const Passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send({
        status: false,
        message: "Please fill all required fields",
      });
    }

    const payload = req.body;
    let user = await User.findOne({
      $or: [{ email }],
    });
    if (user) {
      return res.send({
        status: false,
        data: user,
        message: "A Wallet or Email already associated to some other user",
      });
    }

    user = await User.create(payload);

    await user.save();
    return res.send({
      status: true,
      data: user,
      message: "User Signup successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "Incorrect email or password" });
    }

    Passport.use(
      new LocalStrategy(
        { usernameField: "email" },
        (username, password, done) => {
          User.findOne(
            { email: username },
            "name email wallet password",
            (err, user) => {
              if (err) {
                return done(err);
              } else if (!user) {
                // unregistered email
                return done(null, false, {
                  status: false,
                  message: "Incorrect email or password",
                });
              } else if (!user.verifyPassword(password)) {
                // wrong password
                return done(null, false, {
                  status: false,
                  message: "Incorrect email or password",
                });
              } else return done(null, user);
            },
          );
        },
      ),
    );

    // call for passport authentication
    Passport.authenticate("local", async (err, user, info) => {
      if (err) {
        return res.status(400).send({
          err,
          status: false,
          message: "Oops! Something went wrong while authenticating",
        });
      }
      // registered user
      else if (user) {
        const accessToken = await user.token();
        const data = {
          accessToken,
        };
        await User.updateOne(
          { _id: user._id },
          { $set: { accessToken } },
          { upsert: true },
        );
        return res.status(200).send({
          status: true,
          message: "User logged in successfully",
          data,
        });
      }
      // unknown user or wrong password
      else {
        return res
          .status(402)
          .send({ status: false, message: "Incorrect email or password" });
      }
    })(req, res);
  } catch (error) {
    return next(error);
  }
};
