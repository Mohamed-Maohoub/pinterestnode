const express = require('express');
const router = express.Router();
const Image = require('../models/image');

//* ======================================================================================

// @route     GET /
// ?limit=..&skip=..&term=..     (pagination)(search)
// @desc      Get  images by searchTerm / All
// @access    Public

router.get('/', async (req, res) => {
  let { term, limit, skip } = req.query;
  
  let login = term ? { login: term } : {};
  skip = skip ? parseInt(skip) : 0;
  limit = limit ? parseInt(limit) : 12;
  // check if it doesn't exceed max value
  if (limit > 15) {
    limit = 15;
  }
  try {
    const data = await Image.find(login, 'login   avatar_url', {
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

    return res.send({ error: ` ${term}  not exist` });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

//! =====================================================================================

module.exports = router;
