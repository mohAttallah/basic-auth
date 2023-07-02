const bcrypt = require("bcrypt");
const base64 = require("base-64");
const { User } = require("../models");



const basicAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const authData = req.headers.authorization.split(' ');
    const encodedData = authData.pop();
    const decodedData = base64.decode(encodedData);
    const [username, password] = decodedData.split(':');

    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      req.user = user; // Store the user object in the request for later use
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
};

const signupMiddleware = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const record = await User.create({
      username: username,
      password: hashedPass
    });

    res.locals.record = record; // Store the created record in res.locals for subsequent middleware or route handlers
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
    signupMiddleware:signupMiddleware,
    basicAuth:basicAuth
}