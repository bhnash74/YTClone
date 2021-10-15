const {Comment, validate, Reply, validatereply} = require('../models/comment');
const express = require('express');
const router = express.Router();
// Post Comment
router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
            if(error)
                return res.status(400).send(error);
        const comment = new Comment({
            text: req.body.text,
            videoId: req.body.videoId,
});
    await comment.save();
    return res.send(comment);
    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }  
});
//Post Reply
router.post('/:commentId', async (req, res) => {
    try{
        const {error} = validatereply(req.body);
            if(error)
                return res.status(400).send(error);
        const comment = await Comment.findById(req.params.commentId);
        const reply = new Reply({
            text: req.body.text,
        });
        comment.replies.push(reply);
        await comment.save();
        return res.send(comment);
    }
     catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }   
});
//Get Comment
router.get('/:videoId', async (req, res) => {
    try {
        const comments = await Comment.find({videoId:req.params.videoId});
        if(!comment)
        return res.status(400).send(`The video with id "${req.params.videoId}" does not exist.`);
        return res.send(comments);
        }
    
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }  
});
//Put Likes
router.put('/likes/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        comment.likes+=1;
        if(!comment)
            return res.status(400).send(`The comment with id "${req.params.commentId}" does not exist.`);
        await comment.save();
        return res.send(comment);
        }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }  
});
//Put Dislikes
router.put('/dislikes/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        comment.dislikes+=1;
        if(!comment)
        return res.status(400).send(`The comment with id "${req.params.commentId}" does not exist.`);
        await comment.save();
        return res.send(comment);
        }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }  
});

module.exports = router;