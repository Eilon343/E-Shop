// Importing necessary modules and dependencies
import express from "express";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import Bcrypt from "bcryptjs";
import {
  generateToken,
  generateTokenForgotPassword,
  isAuth,
} from "../utils.js";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const userRouter = express.Router();

// POST /api/v1/users/signin
// Endpoint for user sign-in
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    // Finding the user in the database based on the provided email
    const user = await User.findOne({ email: req.body.email });

    // Checking if the user exists and the provided password matches the stored password
    if (user) {
      if (Bcrypt.compareSync(req.body.password, user.password)) {
        // If the password is valid, create a response with user details and a token
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }

    // If the email or password is invalid, send an error response
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: Bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  })
);

userRouter.post(
  "/forgot-password",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email);

    try {
      const oldUser = await User.findOne({ email: email });
      if (!oldUser) return res.status(401).send({ message: "User not found" });
      const token = generateTokenForgotPassword(oldUser);
      const link = `${process.env.FRONT_URL}/reset-password/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "eilon343@gmail.com",
          pass: "crvsvgrcmgfbzjka",
        },
      });

      var mailOptions = {
        from: "youremail@gmail.com",
        to: "togames343@gmail.com",
        subject: "Reset Password EShop",
        text: `This is a link for resetting your password, notice that it will expire in 5 minutes. \n ${link}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.send("Done");
    } catch (err) {}
  })
);

userRouter.post(
  "/reset-password/:id/:token",
  expressAsyncHandler(async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    //verifying user
    const oldUser = await User.findById(id);
    if (!oldUser) return res.status(401).send({ message: "User not exists!" });
    try {
      const verify = Jwt.verify(token, process.env.JWT_PW);
      const encryptedPassword = Bcrypt.hashSync(password);
      await User.updateOne(
        { _id: id },
        { $set: { password: encryptedPassword } }
      );
      res.status(200).send({ message: "Password Updated" });
    } catch (err) {
      res.status(401).send({
        message:
          "User not verified, The link might be expired, try again with new link",
      });
    }
  })
);

// Exporting the userRouter
export default userRouter;
