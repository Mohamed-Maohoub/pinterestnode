const express = require('express');
const router = express.Router();
const User = require('../models/user');

//* ======================================================================================

// @route     GET /
// ?limit=..&skip=..&term=..     (pagination)(search)
// @desc      Get  images
// @access    Public
router.get('/', async (req, res) => {
  console.log('hit server', req.query);
  let { term, limit, skip } = req.query;
  let login = term ? { login: term } : {};

  skip = skip ? parseInt(skip) : 0;
  limit = limit ? parseInt(limit) : 15;
  try {
    
    const data = await User.find(login, 'login id node_id avatar_url', {
      limit,
      skip
    });
    
    if (data.length) {
     
      let hasMore = true;
      if (data.length < limit) {
        hasMore = false;
      }
      return res.send({ data, hasMore });
    }
    
      return res.send({ error: 'Element not exist' });
    
  } catch (error) {
    console.log("server Error");
    res.status(500).send({ error });
  }
});

//! =====================================================================================

//* ======================================================================================

module.exports = router;
