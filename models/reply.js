const mongoose = require('mongoose');
const Joi = require('joi');
const replySchema = new mongoose.Schema({
    text: {type: String,  required: true, minlength:1, maxlength:500},
  //  commentId: {type: mongoose.ObjectId, ref: 'Comment'},
    videoId: {type: String, ref: 'Comment'},
    timeStamp:{type: Date, default: Date.now()},
});

const Reply = mongoose.model('Reply', replySchema);

function validateReply(reply) {
    const schema = Joi.object({
        text: Joi.string().min(1).max(500).required(),
    })
    return schema .validate(reply);
}     
