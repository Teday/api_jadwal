const express = require('express');
const jwt = require('jsonwebtoken');
const jwtRouter = express.Router();

function generateAccessToken(username) {
    return jwt.sign(username,process.env.TOKEN, { expiresIn: '1800s' });
}

jwtRouter.route('/generate').post(async (req, res) => {
    const token = generateAccessToken({ username: req.body.username });
    return res.json(token);
});



module.exports = jwtRouter;