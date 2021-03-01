const mongoose = require('mongoose');

const followersSchema = mongoose.Schema({
    followerId: { type: String, required: true },
    followerName: { type: String, required: true },
    followingId: { type: String, required: true },
    followingName: { type: String, required: true },
    // followingId: { type: mongoose.Schema.ObjectId, ref: 'Company' },
});
module.exports = mongoose.model('Followers', followersSchema);
