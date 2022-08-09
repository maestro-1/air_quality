import express from 'express';
import router from './router';
import { dataSource } from './config/data-source';
import { parisAirQualityCron } from './services/cron';



interface IApp {
	config(): void;
	routes(): void;
}

class App implements IApp {
	// public err: string;
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
		parisAirQualityCron.start();
	}

	public config(): void {
		//configurations
		this.app.use(express.json());

		this.app.use(express.urlencoded({ extended: true }));

		// initialize database
		dataSource.initialize()
			.then(() => {
				console.log("Data Source has been initialized!")
			})
			.catch((err) => {
				console.error("Error during Data Source initialization", err)
			})
	}

	public routes(): void {
        this.app.use('/api', router);
		this.app.use('*', (req, res) => {
			res.status(404).send('Oops! 404 NOT FOUND');
		});

	}
}

export default new App().app;
