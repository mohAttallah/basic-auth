const express = require("express");
const router = express.Router();
const { User } = require("./models/index");
const bcrypt = require("bcrypt");
const { hashedPass } = require('./middleware/basic');
const { basicAuth } = require('./middleware/basic');





router.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to hame page"
    })
})


router.post('/signup',hashedPass , async (req, res) => {
  const { username, password } = req.body;
  try {
      hashedPassword = hashedPass(password);
      const record = await User.create({
            username: username,
            password:hashedPassword 
    });
    res.status(201).json(record);
      
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/signin',basicAuth,async (req, res) => {
    res.status(200).json({ user: req.user });
})











module.exports = router;