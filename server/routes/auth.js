const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const storyBooks = 'http://localhost:4600';

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
    // res.redirect('/dashboard');
    axios.get(`${storyBooks}/dashboard`)
      .then(response => {
        res.redirect('/dashboard')
      })
      .catch(error =>  {
        res.status(500).send(error)
      });
  });

router.get('/verify', (req, res) => {
  if(req.user){
    console.log(req.user);
  } else {
    console.log('Not Auth');
  }
});

async function getAll(){
  return await User.find().select(user);
}

router.get('/user/:id', ById);
// get user by id
async function getById(googleID){
  return await User.findById(googleID).select(googleID);
}
function ById(req, res, next){
  getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404));
}



router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
