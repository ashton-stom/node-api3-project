const users = require('../users/users-model.js')



function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date()}`)
  next();
}

async function validateId(req, res, next) {
  const { id } = req.params;
  try {
    const User = await users.getById(id);
    if (User) {
      req.User = User;
      next();
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
  }
}

function validateUser(req, res, next) {
  if (!req.body || (req.body && Object.keys(req.body).length == 0)) {
    res.status(400).json({ message: "missing user data", status: 400 })
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    next();
  } else {
    res.status(400).json({ message: 'body is required' });
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateId,
  validateUser,
  validatePost
}