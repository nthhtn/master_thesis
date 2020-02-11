import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import redis from 'redis';
import webpack from 'webpack';
import { MongoClient } from 'mongodb';
import { db_url, db_name } from './config/mongodb';
import { port } from './config/port';
import { redis_host } from './config/redis';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(`${__dirname}/static`));

const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

app.use(session({
	secret: 'master_thesis',
	resave: false,
	saveUninitialized: false,
	store: new redisStore({ host: redis_host, port: 6379, client: redisClient })
}));

app.use(morgan('dev'));

import config from './webpack.config';
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

MongoClient.connect(db_url, async (err, client) => {
	if (err) { throw err; }
	const db = await client.db(db_name);
	require('./server/routes')(app, db);
	// require('./server/helpers/init')(db);
	app.listen(port, () => console.log(`App is listening on port ${port}`));
});


