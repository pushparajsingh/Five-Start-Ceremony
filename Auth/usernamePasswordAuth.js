const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Person = require('../models/person');



passport.use(new LocalStrategy(async (username, password, done) => {
  try{
    const user = await Person.findOne({username});
    if(!user)
      return done(null, false, { message:'Incorrect Username.'});
    const isPasswordMatch = await user.comparePassword(password);
    if(isPasswordMatch)
      return done(null, user);
    else return done(null, false, { message:"Incorrect password."});
  } catch(err){
    return done(err);
  }
}));


module.exports = passport