import { config } from "./config/config";
import { logger } from './etc/logger/winston';
import mongoose from 'mongoose';
import util from 'util';

export class Db {
	private options = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};

	constructor() {
		this.init();
	}

	public connect = async () => {
		try {
			await mongoose.connect(`${config.mongo.path}/${config.mongo.name}`, this.options);
		}

		catch (err) {
			console.error(err)
		}
	}


	private init() {
		// Exit application on error
		mongoose.connection.on('error', err => {
			logger.error(`[MongoDB]: connection error: ${err}`);
			setTimeout(this.connect, 5000)
		});

		mongoose.connection.on('connected', () => {
			logger.info(`[MongoDB]: connected`);

			if (config.mongo.debug) {
				mongoose.set('debug', (collectionName: string, method: string, query: any, doc: any) => {
					logger.debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
				});
			}
			mongoose.set('useCreateIndex', true);
			mongoose.set('useFindAndModify', false);
			mongoose.set('useUnifiedTopology', false);
		});


	}
}