import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: [
      `src/entity/**/*.{ts,js}`
    ],
    migrations: [
       `migrations/**/*.{ts,js}`
    ],
    subscribers: [
       `src/subscriber/**/*.ts`
    ]
})


export default dataSource