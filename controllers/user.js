import User from "../models/user.js";

const setProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.avatar;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { 
          avatarImage: avatarImage,
          isAvatarImageSet: true,
        },
      },
      {
        new: true,
      }
    );
    return res.json({
      isSet: user.isAvatarImageSet,
      image: user.avatarImage,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.params.id }});
  const usersWithoutPassword = users.map((user) => {
    const { password, ...userWithoutPassword } = user._doc;
    return userWithoutPassword;
  });
  return res.json(usersWithoutPassword);
}

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select([
      "name",
      "username",
      "avatarImage",
      "email",
      "isFirstLogin"
    ]);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
}

export { setProfilePicture, getAllUsers, getCurrentUser };
