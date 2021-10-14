const {Comment, validate, Reply, validatereply} = require('../models/comment');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
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

router.post('/', async (req, res) => {
    try {
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

router.post('/:commentId', async (req, res) => {
    try{
        const reply = await Comment.find({commentId:`${req.params._id}`});

        return res.send(reply);
    }
     catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }   
});

router.get('/:videoId', async (req, res) => {
    try {
        const comments = await Comment.find({videoId:`${req.params.videoId}`});

        return res.send(comments);
        }
    
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }  
});

module.exports = router;