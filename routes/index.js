var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.send("Invalid email");
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(result);
        if (result) {

          User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
              console.log("Success");
              res.send({ code: 1, msg: "Success" });
            } else {
              console.log("unsuccessful");
              res.send({ code: 0 });
            }
          });
        } else {
          console.log("Unsuccessful");
          res.send({ code: 0 });
        }
      });
    }
  });

});

/* Get SignUp Page */
router.get('/signUp', (req, res) => {
  res.render('signup', { title: 'Sign UP' });
});

router.post('/signUp', (req, res) => {
  User(req.body).save((err, user) => {
    if (user) {
      console.log("Data saved successfully");
      res.send({ code: 1, msg: "Success", user });
    } else {
      console.log("Error", err);
      res.send({ code: 0, msg: "Unsuccessful" });
    }

  });
});


module.exports = router;
