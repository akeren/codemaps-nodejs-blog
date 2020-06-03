const path = require('path');
const cloudinary = require('cloudinary');
const Post = require('./../models/Post');
exports.checkPostBody = (req, res, next) => {
	if (
		!req.body.title ||
		!req.body.subtitle ||
		!req.body.content ||
		!req.files.image
	) {
		return res.redirect('/post/new');
	}

	next();
};

exports.getPost = async (req, res) => {
	const post = await Post.findById(req.params.id).populate('author');
	res.render('post', { post });
};

exports.createPost = (req, res) => {
	if (req.session.userId) {
		return res.render('create');
	}
	res.redirect('/auth/login');
};

exports.storePost = (req, res) => {
	const { image } = req.files;
	const uploadPath = path.join(__dirname, '..', 'public/posts', image.name);
	image.mv(uploadPath, (error) => {
		cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
			if (error) {
				return res.redirect('/');
			}
			Post.create(
				{
					...req.body,
					image: result.secure_url,
					author: req.session.userId
				},
				(error, post) => {
					res.redirect('/');
				}
			);
		});
	});
};
