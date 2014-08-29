var mongoose = require('mongoose')
  , Meetup = require("meetup-api")('436c1a323a750451b7270b30662e77')
  , User = mongoose.model('User');

exports.signin = function (req, res) {};

exports.authCallback = function (req, res, next) {
	  res.render('users/show');
};

exports.getOpenEvents = function (req, res) {
	console.log("Open Events CAll");
	console.log(User.name);
	Meetup.getOpenEvents({'state':'CA', 'zip':'94587', 'page':'1', 'country':'USA', 'city': 'San Franscisco', 'visibility': 'members', 'description':'Merhaba', 'yes_rsvp_count':'500', 'yes_rsvp_count':'300'}, function(err,events) {
		console.log(events);
		res.json({ message: events });
	});
};

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login',
    message: req.flash('error')
  });
};

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
};

exports.session = function (req, res) {
  res.redirect('/');
};

exports.create = function (req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  User
    .findOne({ email: newUser.email })
    .exec(function(err, user){
      if(err) return next(err);
      if(!user){
        newUser.save(function(err){
          if (err) {  console.log(err); return res.render('users/signup', { errors: err.errors, user:newUser }); } 

          req.logIn(newUser, function(err) {
            if (err) return next(err);
            return res.redirect('/');
          });     
        });
      } else {
        return res.render('users/signup', { errors: [{"message":"email already registered"}], user:newUser });
      }
    });
};

exports.show = function (req, res, next) {
  User
    .findOne({ _id : req.params['userId'] })
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User '));

      res.render('users/profile', {
        title: user.name,
        user: user
      });
    });  
};

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};
