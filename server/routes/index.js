import path from 'path';

module.exports = (app, db) => {

	require('./guest')(app, db);

	app.route('*')
		.get((req, res) => {
			res.sendFile(path.resolve(`${__dirname}/../views/staff.html`));
		});

};
