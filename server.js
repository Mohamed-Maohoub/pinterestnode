const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const Image = require('./models/image');
const PORT = config.get('PORT');

//*================================Connect to Database=====================================

connectDB();

//*==================== Make request to get and store data from Github Api =================

const activateGettingNewImages = process.argv[2];
if (activateGettingNewImages === 'activate') {
  const https = require('https');
  const options = {
    hostname: 'api.github.com',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
    },
    port: 443,
    path: '/users',
    method: 'GET'
  };
  let str = '';
  const req = https.request(options, res => {
    res.on('data', d => {
      str += d;
    });
    res.on('end', function() {
      let data = JSON.parse(str);
      data.forEach(async element => {
        let image = new Image(element);
        try {
          await image.save();
        } catch (error) {
          console.log('unable to save images');
        }
      });
    });
  });
  req.on('error', error => {
    console.error('Failed To get Images');
  });

  req.end();
}

//*======================================================================================

const app = express();

//*======================================================================================

app.use(express.json());

//*======================================R outes ========================================

app.use('/home', require('./routes/images'));

//*================================= Start listening on configured PORT==================

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`)); 