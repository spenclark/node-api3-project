const db = require(`../../users/userDb`);

const validateUserId = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await db.getById(id);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: `invalid user id` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: `Error getting users from the database`, error });
  }
};

module.exports = validateUserId;