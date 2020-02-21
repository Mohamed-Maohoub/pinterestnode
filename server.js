const fs = require('fs');
const path = require('path');
const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const User = require('./models/user');
const PORT = config.get('PORT');

const app = express();
//*======================================================================================

// Connect Database
connectDB();

//*======================================================================================

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
      console.log(data);
      data.forEach(async element => {
        let user = new User(element);
        try {
          await user.save();
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
app.use(express.json());


//*======================================================================================

// Routes
app.use('/home', require('./routes/users'));

//*======================================================================================

// // Serve static assets in production
// if (process.env.NODE_ENV == 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

//*======================================================================================

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
