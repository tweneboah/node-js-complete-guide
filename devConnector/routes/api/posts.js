const express = require('express');
const router = express.Router();


//@route GET api
router.get('/test', (req, res) => {
    return res.json({msg: 'Profile works'})
})

module.exports = router;