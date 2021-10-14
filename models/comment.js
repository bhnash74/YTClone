const mongoose = require('mongoose');
const Joi = require('joi');

const replySchema = new mongoose.Schema({
    text: {type: String,  required: true, minlength:1, maxlength:500},
    commentId: {type: mongoose.ObjectId, ref: 'Comment'},
    timeStamp:{type: Date, default: Date.now()},
});
const Reply = mongoose.model('Reply', replySchema);

const commentSchema = new mongoose.Schema({
    text: {type: String, required: true, minlength:1, maxlength:500},
    videoId: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now()},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    replies: {type: [replySchema], default: []},
})
const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
    const schema = Joi.object({
        text: Joi.string().min(1).max(500).required(),
        videoId: Joi.string().required(),
    })
    return schema .validate(comment);
}     

function validateReply(reply) {
    const schema = Joi.object({
        text: Joi.string().min(1).max(500).required(),
    })
    return schema .validate(reply);
}   


exports.Comment = Comment;
exports.validate = validateComment;
exports.commentSchema = commentSchema;
exports.Reply = Reply;
exports.validatereply = validateReply;
exports.replySchema = replySchema;