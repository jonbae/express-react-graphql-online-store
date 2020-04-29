const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// here we'll be taking in the `data` from our mutation
const register = async (data) => {
  try {
    // run it through our validator which returns if the data isValid
    // and if not it returns a nice message for the client side
    const { message, isValid } = validateRegisterInput(data);

    // if the data we received isn't valid through up the error message from validator
    if (!isValid) {
      throw new Error(message);
    }

    // deconstruct our data
    const { name, email, password } = data;

    // we want to wait until our model can tell us whether a user exists with that email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        name,
        email,
        password: hashedPassword,
      },
      (err) => {
        if (err) throw err;
      }
    );

    user.save();
    // we'll create a token for the user
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async (data) => {
  try {
    const { _id } = data;

    const user = await User.findById(_id);
    if (!user) throw new Error("This user does not exist");

    const token = "";

    return { token, loggedIn: false, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async (data) => {
  try {
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error("This user does not exist");

    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw new Error("Invalid password");

    const token = jwt.sign({ id: user.id }, keys);

    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const verifyUser = async (data) => {
  try {
    const { token } = data;
    const decoded = jwt.verify(token, keys);
    const { id } = decoded;

    const loggedIn = await User.findById(id).then((user) => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, logout, login, verifyUser };
