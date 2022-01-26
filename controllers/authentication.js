const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');
function generateToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp }, config.secret)
}
exports.signup = function (req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email }, (err, existingUser) => {
		if (err) {
			return next(err);
		}
		if (!email || !password) {
			return res
				.status(422)
				.send({ error: 'Email and password are required fields!' });
		}
		if (existingUser) {
			return res.status(422).send({ error: 'This email already exists!' });
		}

		const user = new User({
			email: email,
			password: password,
		});

		user.save(function (err) {
			if (err) {
        console.log(err)
				return next(err);
			}

			return res.json({user: user, token: generateToken(user)});
		});
	});
};

exports.signin = function(req, res, next) {
  res.send(generateToken(req.user))
}
