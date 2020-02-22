const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//* ======================================================================================

const ImageSchema = new Schema({
  login: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  id: {
    type: Number
  },
  node_id: String,
  avatar_url: {
    type: String,
    required: true
  },
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: Boolean
});

//* ======================================================================================
module.exports = mongoose.model('image', ImageSchema);
