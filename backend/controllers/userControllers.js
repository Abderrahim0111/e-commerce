const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ error: "All fields are requiered" });
  }
  try {
    const isUsername = await User.findOne({ username });
    if (isUsername) {
      return res.json({ error: "Username taken" });
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.json({ error: "Email taken" });
    }
    const user = await User.create(req.body);
    const { password: pass, ...rest } = user._doc;
    const token = jwt.sign({ id: rest._id }, process.env.JWT);
    res.cookie("jwt", token, { httpOnly: true });
    res.json(rest);
  } catch (error) {
    res.json({ error: error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ error: "All fields are requiered" });
  }
  try {
    const isUser = await User.findOne({ username });
    if (!isUser) {
      return res.json({ error: "Please register first" });
    }
    const match = await bcrypt.compare(password, isUser.password);
    if (!match) {
      return res.json({ error: "Incorrect password" });
    }
    const { password: pass, ...rest } = isUser._doc;
    const token = jwt.sign({ id: rest._id }, process.env.JWT);
    res.cookie("jwt", token, { httpOnly: true });
    res.json(rest);
  } catch (error) {
    res.json({ error: error });
  }
};

const logout = (req, res) => {
  if (!req.cookies.jwt) {
    return res.json({ error: "Not allowed" });
  }
  try {
    res.clearCookie("jwt");
    res.json({ message: "Loged out successfully" });
  } catch (error) {
    res.json({ error: error });
  }
};

const updateUser = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = await jwt.verify(token, process.env.JWT);
  if (decoded.id !== req.params.userId) {
    return res.json({ error: "not allowed" });
  }
  try {
    const updated = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    const { password: pass, ...rest } = updated._doc;
    res.json(rest);
  } catch (error) {
    res.json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = await jwt.verify(token, process.env.JWT);
  if (decoded.id !== req.params.userId) {
    return res.json({ error: "not allowed" });
  }
  try {
    const updated = await User.deleteOne({ _id: req.params.userId });
    res.json({ message: "user deleted" });
  } catch (error) {
    res.json({ error: error });
  }
};

const fetchUsers = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = await jwt.verify(token, process.env.JWT);
  if (decoded.id !== process.env.ADMIN) {
    return res.json({ error: "not allowed" });
  }
  try {
    const users = await User.find()
    res.json(users.length)
  } catch (error) {
    res.json({error: error})
  }
}

module.exports = {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  fetchUsers
};
