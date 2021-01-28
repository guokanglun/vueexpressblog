const express = require('express');
const router = express.Router();
const swiperData = require('../data/swiper');

router.get('/swiper', (req, res)=>{
   res.send({code:0, msg:swiperData})
});

module.exports = router;
