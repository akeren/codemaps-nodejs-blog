const Post = require('./../models/Post');

exports.getAllPosts = async (req, res) => {
	const posts = await Post.find({}).populate('author');
	res.render('index', { posts });
};
