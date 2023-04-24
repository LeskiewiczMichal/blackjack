const UserDetails = require("../models/userDetails");

const getUserData = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userData = await UserDetails.findById(user._id).exec();
    return res.json({ user: userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  UserDetails.register(
    new UserDetails({
      username: req.body.username,
      email: req.body.email,
      balance: 1000,
      ownedSkins: [],
      activeSkins: [],
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      passport.authenticate("local")(req, res, () => {
        res.status(200).json({ message: "Registration successful" });
      });
    }
  );
};

const updateBalance = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userData = await UserDetails.findById(user._id).exec();
    userData.balance = req.body.balance;
    await userData.save();
    return res.json({ user: userData });
  } catch {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const user = req.user;
  await user.populate("activeSkins");
  await user.populate("ownedSkins");
  res.json({ user });
};

const logout = async (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
};

const getUserSkins = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    user.populate("activeSkins");
    user.populate("ownedSkins");

    return res.json({
      ownedSkins: user.ownedSkins,
      activeSkins: user.activeSkins,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserData,
  register,
  updateBalance,
  login,
  logout,
  getUserSkins,
};
