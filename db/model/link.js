const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const linkSchema = new Schema({
    url: { type: String, required: true },
    
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now, expires: '30d' }
}, { timestamps: true });
module.exports = mongoose.model("Link", linkSchema)