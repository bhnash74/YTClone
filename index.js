const mongoose = require('mongoose');
const config = require('config');
const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors');
const comments = require('./routes/comments');

 mongoose
        .connect(
            config.get('mongoURI'),
            {useNewUrlParser: true})
        .then(() => console.log('Connected to MongoDB...'))
        .catch((err) => {
            console.log(`Could not connect to MongoDB.  ERROR: ${err}`);
        process.exit(1);
        });

app.use(express.json());
app.use(cors({ origin: '*'}));
app.use('/api/comments', comments);
const port = process.env.PORT ||5000;
app.listen(port, () => {
    console.log(`Server sarted on port: ${port}`);
});