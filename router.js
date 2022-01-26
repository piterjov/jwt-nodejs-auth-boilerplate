const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const authMiddleware = passport.authenticate('jwt', { session: false });
const signInMiddleware  = passport.authenticate('local', {session: false})
module.exports = function (app) {
	app.get('/forbidden', authMiddleware, (req, res) => {
		res.send('hi');
	});
  app.post('/signup', Authentication.signup);
  app.post('/signin', signInMiddleware, Authentication.signin )
};
