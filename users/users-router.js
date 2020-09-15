const express = require("express");
const users = require("./users-model");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("I am the req.query:", req.query);
  users
    .find(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users",
      });
    });
});

router.get("/:id", (req, res) => {
  users
    .findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user",
      });
    });
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Missing user name or email",
    });
  }

  users
    .add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the user",
      });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Missing user name or email",
    });
  }

  users
    .update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "The user could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user",
      });
    });
});

router.delete("/:id", (req, res) => {
  users
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been nuked",
        });
      } else {
        res.status(404).json({
          message: "The user could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the user",
      });
    });
});

// create endpoint that returns all the posts for a user
router.get("/:id/posts", (req, res) => {
  // now what?
  //  I would use users.findUserPosts(),or users.findUserPostsById()
  users
    .findUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "could not get user post" });
    });
});

router.get("/:userId/posts/:postId", (req, res) => {
  users
    .findUserPostById(req.params.userId, req.params.postId)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: "There was and error :(" });
    });
});
// create endpoint for adding a new post for a user
router.post("/:userId/posts", (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      message: "Need a value for text",
    });
  }
  users
    .addUserPost(req.params.userId, req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create user post :(" });
    });
});
module.exports = router;
