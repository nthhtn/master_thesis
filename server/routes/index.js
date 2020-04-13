import path from 'path';
import { isLoggedIn } from '../helpers/middleware';

module.exports = (app, db) => {

	require('./guest')(app, db);

	app.use('/api', isLoggedIn);

	require('./staff/workgroup')(app, db);
	require('./staff/conversation')(app, db);
	require('./staff/task')(app, db);
	require('./staff/customer')(app, db);
	require('./staff/ticket')(app, db);
	require('./staff/user')(app, db);
	require('./staff/index')(app, db);

	require('./manager/ticketSector')(app, db);

	app.route('/logout')
		.get((req, res) => {
			if (req.isAuthenticated()) { req.logOut(); }
			return res.sendFile(path.resolve(`${__dirname}/../views/guest.html`));
		});

	app.route('*')
		.get((req, res) => {
			const viewpath = req.isAuthenticated() ? `${__dirname}/../views/staff.html` : `${__dirname}/../views/guest.html`;
			return res.sendFile(path.resolve(viewpath));
		});

};
