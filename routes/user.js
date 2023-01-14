const express = require("express");
const { auth } = require("../middleware/auth");
const User = require("../models/user");
const generateToken = require("../config/generateToken");
const axios = require("axios");

const router = express.Router();
const onlineUsers = {};

router.get("/online-user", auth, async (req, res) => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/user");
    const onlineUsers = data.filter((user) => onlineUsers[user._id]);
    res.json(onlineUsers);
  } catch (error) {
    res.status(404).json({ msg: "Users not found", error });
  }
});

router.put("/online-user/:id", (req, res) => {
  onlineUsers[req.params.id] = req.body.username;
  res.json(onlineUsers);
});

router.delete("/online-user/:id", (req, res) => {
  delete onlineUsers[req.params.id];
  res.json(onlineUsers);
});

router.get("/", auth, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
router.post("/", async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    res.send({ message: "Please Enter all the Feilds" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    res.send({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.send({ message: "User not found" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.send({ message: "Invalid Email or Password" });
  }
});

module.exports = router;
