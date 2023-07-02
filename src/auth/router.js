const express = require("express");
const router = express.Router();
const { User } = require("./models/index");

const { basicAuth } = require('./middleware/basic');


const { signupMiddleware } = require('./middleware/basic');


router.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to hame page"
    })
})


router.post('/signup',signupMiddleware,async (req, res) => {
  const record = res.locals.record;
  res.status(201).json(record);
});

router.post('/signin', basicAuth, async (req, res) => {
  res.status(200).json({ user: req.user });
});
  
module.exports = router;