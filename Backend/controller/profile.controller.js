const User = require("../model/user.model");
const Profile = require("../model/UserProfile");

const shapeProfileResponse = (user, profile) => ({
  user: {
    _id: user._id,
    name: user.name || user.username,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  },
  profile: {
    name: profile?.name || user.name || user.username,
    bio: profile?.bio || "",
    createdAt: profile?.createdAt || user.createdAt,
    updatedAt: profile?.updatedAt || user.updatedAt,
  },
});

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = await Profile.findOne({ user: user._id });
    return res.status(200).json(shapeProfileResponse(user, profile));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const upsertMyProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    const safeName = String(name ?? "").trim();
    const safeBio = String(bio ?? "").trim();

    if (!safeName) {
      return res.status(400).json({ message: "Name is required" });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          user: req.user._id,
          name: safeName,
          bio: safeBio,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    await User.findByIdAndUpdate(req.user._id, { name: safeName });

    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({
      message: "Profile saved successfully",
      ...shapeProfileResponse(user, profile),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = await Profile.findOne({ user: user._id });

    return res.status(200).json(shapeProfileResponse(user, profile));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyProfile,
  upsertMyProfile,
  getProfileByUsername,
};
