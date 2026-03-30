const mongoose = require("mongoose");
const User = require("../models/User");

const isValidationError = (error) => error.name === "ValidationError";

const sendServerError = (res, error) =>
  res.status(500).json({ error: "Server error", details: error.message });

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email, and password are required" });
    }

    if (role && role !== "user") {
      return res
        .status(400)
        .json({ error: "Public registration cannot assign admin privileges." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone: phone || "",
      role: "user",
    });

    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userObject,
    });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }

    sendServerError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const userObject = user.toObject();
    delete userObject.password;
    const token = user.getSignedToken();

    res
      .status(200)
      .json({ message: "Login successful", token, user: userObject });
  } catch (error) {
    sendServerError(res, error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        error: "You don't have admin privileges.",
      });
    }

    const users = await User.find({ _id: { $ne: req.user.id } })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ count: users.length, users });
  } catch (error) {
    sendServerError(res, error);
  }
};

const getOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    sendServerError(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    if (req.user.id !== id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not allowed to access this user profile." });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    sendServerError(res, error);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    if (req.user.id !== id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not allowed to update this user profile." });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ error: "Email already registered" });
      }
      user.email = email;
    }

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (password) user.password = password;

    if (role !== undefined) {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ error: "Only admin users can update roles." });
      }
      user.role = role;
    }

    const updatedUser = await user.save();
    const userObject = updatedUser.toObject();
    delete userObject.password;

    res
      .status(200)
      .json({ message: "User profile updated successfully", user: userObject });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }

    sendServerError(res, error);
  }
};

const updateOwnProfile = async (req, res) => {
  if (req.body && req.body.role !== undefined) {
    return res.status(400).json({
      error:
        "Role updates are not allowed through /users/me. Use admin endpoint /users/:id.",
    });
  }

  req.params.id = req.user.id;
  return updateUserProfile(req, res);
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getOwnProfile,
  getUserById,
  updateOwnProfile,
  updateUserProfile,
};
