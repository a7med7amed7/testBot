const router = require('express').Router();
const Token = require('../models/token')
router.post('/token/', async (req, res) => {
    const { token } = req.body;
    const newToken = await new Token(req.body);
    try {
        const savedToken = await newToken.save();
        res.status(200).json(savedToken);
    } catch (error) {
        console.log(error)
    }
    console.log(token);
})

module.exports = router;