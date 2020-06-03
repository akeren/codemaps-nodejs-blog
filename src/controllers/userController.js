const bcrypt = require('bcrypt');
const User = require('./../models/User');

exports.createUser = (req, res) => {
	res.render('register', {
		errors: req.flash('signUpErrors'),
		data: req.flash('data')[0]
	});
};

exports.storeUser = (req, res) => {
	User.create(req.body, (error, user) => {
		if (error) {
			// Acquiring the errors
			const signUpErrors = Object.keys(error.errors).map(
				(key) => error.errors[key].message
			);
			// flashing the errors
			req.flash('signUpErrors', signUpErrors);
			req.flash('data', req.body);
			return res.redirect('/auth/register');
		}
		res.redirect('/');
	});
};

exports.getLogin = (req, res) => {
	res.render('login');
};

exports.processLogin = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (error, user) => {
		if (user) {
			bcrypt.compare(password, user.password, (error, confirm) => {
				if (confirm) {
					// start user's session
					req.session.userId = user._id;
					res.redirect('/');
				} else {
					res.redirect('/auth/login');
				}
			});
		} else {
			return res.redirect('/auth/login');
		}
	});
};

exports.logout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
};
