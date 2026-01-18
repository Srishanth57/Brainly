import express, { type Request, type Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, UserModel } from "./db.js";

import authMiddleware from "./auth.js";
import { randomStringGenerator } from "./utils.js";

dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  allowedHeaders: "Content-Type,Authorization,token",
};
app.use(cors(corsOptions));
app.use(express.json());
const MONGODB_URI: string = process.env.MONGODB_URI || "";
mongoose.connect(MONGODB_URI);

const SECRET_KEY: string = process.env.SECRET_KEY || "";

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const email = req.body.email;
  const myPlaintextPassword = req.body.password;
  const username = req.body.username;
  const saltRounds = 10;

  const user = await UserModel.find({ email });

  if (user.length !== 0) {
    res.status(403).json({ message: "User already exists" });
    return;
  }

  if (!validator.isEmail(email)) {
    res.json({ message: "Invalid email format" });
    return;
  }

  if (
    !validator.isStrongPassword(myPlaintextPassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    res.json({ message: "Create a more tough password" });
    return;
  }

  bcrypt.hash(
    myPlaintextPassword,
    saltRounds,
    async function (err: Error | undefined, hash: string) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
        return;
      }

      try {
        await UserModel.create({
          username,
          password: hash,
          email,
        });
        res.json({
          message: "You are signed up",
        });
      } catch (e) {
        res.status(403).json({
          err,
        });
      }
    }
  );
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({ email });

  if (!response || !response.password) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  bcrypt.compare(
    password,
    response.password,
    async function (err: Error | undefined, result: boolean) {
      if (err) {
        res
          .status(500)
          .json({ message: "Error comparing passwords", error: err.message });
        return;
      }

      if (result) {
        const token = jwt.sign(
          {
            id: response._id.toString(),
          },
          SECRET_KEY
        );

        res.json({ msg: "Successfully logged in", token });
      } else {
        res.status(403).json({
          message: "Incorrect Password!",
        });
      }
    }
  );
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const userContents = await ContentModel.find({ userId })
    .populate("userId", "username")
    .exec();
  res.json({ userContent: userContents });
});

app.get("/api/v1/content/:contentType", authMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const contentType = req.params.contentType;
  const userContents = await ContentModel.find({ userId, type: contentType })
    .populate("userId", "username")
    .exec();
  res.json({ userContent: userContents });
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  const type = req.body.type;

  await ContentModel.create({
    link,
    title,
    type,
    //@ts-ignore
    userId: req.userId,
  });

  res.json({ message: "Content added " });
});
app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const _id = req.body._id;
  const response = await ContentModel.deleteOne({ _id });

  res.send(response);
});
app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.userId;
    const { share } = req.body;

    // Validate request body
    if (typeof share !== "boolean") {
      res
        .status(400)
        .json({ message: "Invalid request. 'share' must be a boolean" });
      return;
    }

    const existingLink = await LinkModel.findOne({ userId });

    if (share) {
      // User wants to create/enable sharing
      if (existingLink) {
        // Link already exists
        res.status(200).json({
          message: "Shareable link already exists",
          hash: existingLink.hash,
        });
        return;
      }

      // Create new shareable link
      const hash = randomStringGenerator();
      await LinkModel.create({
        hash,
        userId,
      });

      res.status(200).json({
        message: "Successfully created a shareable link",
        hash: hash,
      });
      return;
    }

    // User wants to disable/remove sharing
    if (!existingLink) {
      res.status(404).json({ message: "No shareable link found to remove" });
      return;
    }

    await LinkModel.deleteOne({ userId });
    res.status(200).json({ message: "Shareable link removed successfully" });
  } catch (error) {
    console.error("Error in /api/v1/brain/share:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  try {
    const link = await LinkModel.findOne({ hash });

    if (!link) {
      res.status(404).json({ message: "Invalid Link" });
      return;
    }

    const content = await ContentModel.find({
      userId: link.userId,
    })
      .populate("userId", "username")
      .exec();

    if (!content) {
      res.status(400).json({
        message:
          "Content not found , and this should not happen as link exists. Can be empty ",
      });
      return;
    }

    //Content found for the user
    res.status(200).json({ Contents: content });
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.listen(3000);
