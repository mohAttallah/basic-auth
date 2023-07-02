"use strict";

module.exports=(req, res, next)=> {
  res.status(500).json({ message: 'Internal server error'  });
}
