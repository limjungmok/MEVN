var express = require('express');
var router = express.Router();
var Carousel = require('../models/carousel');

router.get('/', function(req, res, next) {
  var query = {};
  if (req.query.name) {
    query.name = {
      $regex: req.query.name,
      $options: 'i'
    };
  }

  Carousel.find(query)
    .exec(function(err, carousel) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: carousel });
      }
    });
});

// create
router.post('/',
  function(req, res, next){
    Carousel.findOne({})
      .sort({id: -1})
      .exec(function(err, carousel){
        if(err) {
          res.status(500);
          return res.json({success:false, message:err});
        }
        else {
          res.locals._carouselLastId = carousel? carousel.id : 0;
          next();
        }
      });
  },
  function(req, res, next){
    var newCarousel = new Carousel(req.body);
    newCarousel.id = res.locals._carouselLastId + 1;
    newCarousel.save(function(err, carousel){
      if(err) {
        res.status(500);
        res.json({ success:false, message: err });
      }
      else {
        res.json({ success:true, data: carousel });
      }
    });
  }
);


module.exports = router;