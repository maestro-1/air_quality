import express from 'express';
import router from './router';
import dataSource from './config/data-source';
import { parisAirQualityCron } from './services/cron';

import { DataSource } from 'typeorm';
import { ScheduledTask } from 'node-cron';



interface IApp {
	config(): void;
	routes(): void;
}

export class App implements IApp {
	// public err: string;
	public app: express.Application;
	public db: DataSource;
	public cronTasks: Array<ScheduledTask>;

	constructor(db: DataSource, cronTasks: Array<ScheduledTask>) {
		this.app = express();
		this.db = db;
		this.cronTasks = cronTasks;

		this.config();
		this.routes();
		this.start_cron_tasks(cronTasks);
	}

	public config(): void {
		//configurations
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		// initialize database
		this.db.initialize()
			.then(() => {
				console.log("Data Source has been initialized!")
			})
			.catch((err) => {
				console.log("Error during Data Source initialization", err)
			})
	}

	private start_cron_tasks(cronTasks: Array<ScheduledTask>): void {
		if(cronTasks.length < 1){
			return;
		}

		for(let key in cronTasks){
			this.cronTasks[key].start();
		}
	}

	public routes(): void {
        this.app.use('/api', router);
		this.app.use('*', (req, res) => {
			res.status(404).send('Oops! 404 NOT FOUND');
		});

	}

	public close(): void {
		this.db.destroy()
		.then(() => console.log(`Destroyed database connection`))
		.catch(err => console.log(`${err} occured`));

		if(this.cronTasks.length < 1){
			return;
		}

		for(let key in this.cronTasks){
			this.cronTasks[key].stop();
		}
	}
}

export const application = new App(dataSource, [parisAirQualityCron])
