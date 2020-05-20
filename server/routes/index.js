import path from 'path';
import { isLoggedIn } from '../helpers/middleware';

module.exports = (app, db) => {

	require('./guest')(app, db);

	app.use('/api', isLoggedIn);

	require('./user/workgroup')(app, db);
	require('./user/conversation')(app, db);
	require('./user/task')(app, db);
	require('./user/customer')(app, db);
	require('./user/ticket')(app, db);
	require('./user/user')(app, db);
	require('./user/ticketSector')(app, db);
	require('./user/issue')(app, db);
	require('./user/index')(app, db);

	app.route('/logout')
		.get((req, res) => {
			if (req.isAuthenticated()) { req.logOut(); }
			return res.sendFile(path.resolve(`${__dirname}/../views/guest.html`));
		});

	app.route('*')
		.get((req, res) => {
			const viewpath = req.isAuthenticated() ?
				`${__dirname}/../views/${req.user.role === 'guest' ? 'guest' : 'user'}.html` : `${__dirname}/../views/anonymous.html`;
			console.log(viewpath);
			return res.sendFile(path.resolve(viewpath));
		});

};
