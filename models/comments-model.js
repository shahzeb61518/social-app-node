const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    comment: { type: String, required: true },
    commentBlogId: { type: String, required: true },
    commentUserId: { type: String, required: true },
    // followingId: { type: mongoose.Schema.ObjectId, ref: 'Company' },
});
module.exports = mongoose.model('Comments', commentsSchema);
