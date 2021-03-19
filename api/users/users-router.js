const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const posts = require('../posts/posts-model.js')
const users = require('./users-model.js')
const middleware = require('../middleware/middleware.js')
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userList = await users.get();
    res.json(userList)
  } catch (err) {
    console.log(error)
    res.status(500).json({ message: 'Unable to get users right now.' })
  }
});

router.get('/:id', middleware.validateId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.User)
});

router.post('/', middleware.validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const User = await users.insert(req.body)
    res.status(201).json(User)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Unable to create user' })
  }
});

router.put('/:id', middleware.validateId, middleware.validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const User = await users.update(req.params.id, req.body)
    res.status(201).json(User)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Unable to update user' })
  }
});

router.delete('/:id', middleware.validateId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const User = await users.remove(req.params.id)
    res.status(200).json(req.body.User)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Unable to delete user' })
  }
});

router.get('/:id/posts', middleware.validateId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const post = await posts.getById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Unable to find posts' })
  }
});

router.post('/:id/posts', middleware.validateId, middleware.validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const post = await posts.insert({...req.body, "user_id": req.User.id})
    res.status(201).json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Unable to create post' })
  }
});


// do not forget to export the router
module.exports = router;