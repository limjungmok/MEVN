var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
  var query = {};
  if (req.query.name) {
    query.name = {
      $regex: req.query.name,
      $options: 'i'
    };
  }

  User.find(query)
    .exec(function(err, user) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: user });
      }
    });
});

router.get('/:id', function(req, res, next) {
  User.findOne({ id: req.params.id })
    .exec(function(err, user) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: `user ${req.params.id} is not Found` });
      } else {
        res.json({ success: true, data: user });
      }
    });
});

// create
router.post('/',
  function(req, res, next){
    User.findOne({})
      .sort({id: -1})
      .exec(function(err, user){
        if(err) {
          res.status(500);
          return res.json({success:false, message:err});
        }
        else {
          res.locals.lastId = user? user.id : 0;
          next();
        }
      });
  },
  function(req, res, next){
    var newUser = new User(req.body);
    newUser.id = res.locals.lastId + 1;
    newUser.save(function(err, user){
      if(err) {
        res.status(500);
        res.json({ success:false, message: err });
      }
      else {
        res.json({ success:true, data: user });
      }
    });
  }
);


// update
router.put('/:id', function(req, res, next) {
  User.findOneAndUpdate({ id: req.params.id }, req.body)
    .exec(function(err, user) {
      if(err) {
        res.status(500);
        res.json({ success:false, message: err });
      }
      else if(!user){
        res.status(400);
        res.json({ success:false, message: `${user} not found` });
      }
      else {
        res.json({ success: true, message: `${user} is updated` });
      }
    });
});

// Delete
router.delete('/:id', function(req, res, next) {
  User.findOneAndRemove({ id: req.params.id })
  .exec(function(err, user) {
    if (err) {
      res.status(500);
      res.json({ success: false, message: 'err' });
    } else if (!user) {
      res.status(400);
      res.json({ success: false, message: `${user} not found` });
    } else {
      res.status(200);
      res.json({ success: true, message: `${user} is deleted` });
    }
  });
});


module.exports = router;