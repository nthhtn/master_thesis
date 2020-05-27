import path from 'path';
import { isLoggedIn } from '../helpers/middleware';

module.exports = (app, db) => {

	require('./unauthenticated')(app, db);

	app.use('/api', isLoggedIn);

	require('./authenticated/workgroup')(app, db);
	require('./authenticated/conversation')(app, db);
	require('./authenticated/task')(app, db);
	require('./authenticated/customer')(app, db);
	require('./authenticated/ticket')(app, db);
	require('./authenticated/user')(app, db);
	require('./authenticated/ticketSector')(app, db);
	require('./authenticated/issue')(app, db);
	require('./authenticated/index')(app, db);

	app.route('/logout')
		.get((req, res) => {
			if (req.isAuthenticated()) { req.logOut(); }
			return res.sendFile(path.resolve(`${__dirname}/../views/anonymous.html`));
		});

	// app.route('/info')
	// 	.get((req, res) => {
	// 		return res.render('ticket_reply', {});
	// 	});

	app.route('*')
		.get((req, res) => {
			const viewpath = req.isAuthenticated() ?
				`${__dirname}/../views/${req.user.role === 'guest' ? 'guest' : 'user'}.html` : `${__dirname}/../views/anonymous.html`;
			return res.sendFile(path.resolve(viewpath));
		});

};
