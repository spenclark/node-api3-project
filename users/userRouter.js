const express = require("express");

const router = express.Router();
router.use(express.json());

const validateUserId = require(`../api/middleware/validateUserId`);
const validatePost = require(`../api/middleware/validatePost`);
const validateUser = require(`../api/middleware/validateUser`);

const userDb = require(`./userDb`);
const postDb = require(`../posts/postDb`);

const errorMessage = (res, status, msg, error) => {
  console.error(msg, error);
  res.status(status).json({ errorMessage: msg });
};

router.post("/", validateUser, (req, res) => {
  // do your magic!
  userDb
    .insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(error =>
      errorMessage(res, 500, `Error adding user to the database`, error)
    );
});

router.post("/:id/posts", [validateUserId, validatePost], (req, res) => {
  // do your magic!
  postDb
    .insert({ user_id: req.user.id, ...req.body })
    .then(post => res.status(201).json(post))
    .catch(error =>
      errorMessage(res, 500, `error adding post to the database`, error)
    );
});

// returns list of users
router.get("/", (req, res) => {
  // do your magic!
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(error =>
      errorMessage(res, 500, `Error getting users from the database`, error)
    );
});

// user id 
router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

// user posts
router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  userDb
    .getUserPosts(req.user.id)
    .then(posts => res.status(200).json(posts))
    .catch(error =>
      errorMessage(
        res,
        500,
        `Error getting users posts from the database`,
        error
      )
    );
});

// delete user
router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  userDb
    .remove(req.user.id)
    .then(user => res.status(202).json(user))
    .catch(error =>
      errorMessage(res, 500, `error removing user from the database`, error)
    );
});

// changing user database 
router.put("/:id", [validateUser, validateUserId], (req, res) => {
  // do your magic!
  userDb
    .update(req.user.id, req.body)
    .then(user => res.status(201).json(user))
    .catch(error =>
      errorMessage(res, 500, `error updating the user on the database`, error)
    );
});

module.exports = router;