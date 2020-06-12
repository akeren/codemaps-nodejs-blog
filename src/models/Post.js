const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const postSchema = new Schema({
	title: String,
	subtitle: String,
	slug: String,
	content: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	image: String,
	createdAt: {
		type: Date,
		default: new Date()
	}
});

postSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

module.exports = model('Post', postSchema);
