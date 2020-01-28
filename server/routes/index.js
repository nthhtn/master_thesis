import path from 'path';

module.exports = (app, db) => {

	require('./guest')(app, db);
	require('./staff/workgroup')(app, db);
	require('./staff/conversation')(app, db);

	app.route('*')
		.get((req, res) => {
			res.sendFile(path.resolve(`${__dirname}/../views/staff.html`));
		});

};
