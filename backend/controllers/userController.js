const getUserProfile = (req, res) => {
  try {
      const user = req.user;
      delete user['password'];

    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get user profile." });
  }
};

export {
    getUserProfile,
}