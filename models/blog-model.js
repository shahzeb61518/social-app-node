const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blogTitle: { type: String, required: true },
    blogDescription: { type: String, required: true },
    blogImage: { type: String },
    userId: { type: String, required: true },
    userName: { type: String },
    // followingId: { type: mongoose.Schema.ObjectId, ref: 'Company' },
});
module.exports = mongoose.model('Blog', blogSchema);
