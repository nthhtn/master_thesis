import nodemailer from 'nodemailer';
import { host, port, user, pass } from '../../config/mailer';

module.exports.sendMail = ({ to, subject, body }) => {
	return new Promise((resolve, reject) => {
		if (!to) { return reject(new Error('Invalid mail receiver')); }
		if (!subject) { return reject(new Error('Invalid mail subject')); }
		if (!body) { return reject(new Error('Invalid mail content')); }
		const transporter = nodemailer.createTransport({
			host, port,
			secure: false,
			requireTLS: true,
			auth: { user, pass },
			tls: { rejectUnauthorized: false }
		});
		const mailOptions = { from: `"Test Mailer" < ${user} >`, to, subject, html: body };
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) { return reject(err); }
			resolve(info);
			transporter.close();
		});
	});
};
