import type { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import jwt from "jsonwebtoken";

import User from "../model/user-model.js";

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const generateJWTTOken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
};
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken: generateVerificationToken(),
    });
    //sending email for verify the email

    const transport = nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_TOKEN!,
      }),
    );

    const sender = {
      address: process.env.MAILTRAP_SENDER_EMAIL!,
      name: process.env.MAILTRAP_SENDER_NAME!,
    };

    const recipients = [user.email];
    await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Verify your email address",
      text: `Click on the link to verify your email address: http://localhost:5000/verify/${user.verificationToken}`,
      category: "JustPay",
    });

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//verify user
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({ message: "Token is required!" });
    }

    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      {
        $set: {
          isVerified: true,
          verificationToken: null,
        },
      },
      { new: true },
    );
    if (user) {
      return res.redirect("http://localhost:3000/login");
    } else {
      return res.status(400).json({ message: "Invalid token!" });
    }
  } catch (error) {
    console.error("Error during verification:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user?.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }
    // if (password === user.password) {
    //   return res.status(400).json({ message: "Invalid password" });
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      data: {
        id: user._id,
        token: generateJWTTOken(user._id.toString()),
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//reset password 