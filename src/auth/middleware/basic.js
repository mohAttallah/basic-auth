const bcrypt = require("bcrypt");
const base64 = require("base-64");
const { User } = require("../models");


async function hashedPass(password){
    const hashedPass = await bcrypt.hash(password, 5);
    return hashedPass; 
}

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


module.exports = {
    hashedPass: hashedPass,
    basicAuth:basicAuth
}