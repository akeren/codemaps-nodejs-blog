const { connect } = require('mongoose');
(async () => {
	try {
		await connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
	} catch (error) {
		console.log(error);
	}
})();
