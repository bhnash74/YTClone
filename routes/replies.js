const {Reply} = require('../models/reply');
const {Reply, Comment, validate} = require('../models/comment')
const express = require('express');
const router = express.Router();

router.post('/:videoId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.videoId);
        if(!comment) return res.status(400).send('This comment no longer exists');
        
        const reply = new Reply({
            text: req.body.text,
});



await comment.save();

return res.send(comment);

    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }  
});

module.exports = router;