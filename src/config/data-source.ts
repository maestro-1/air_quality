import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();


export const dataSource = new DataSource({
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


export const testDataStore = new DataSource({
   name: `default`,
   type: `better-sqlite3`,
   database: `:memory:`,
   entities: [`src/entity/**/*.ts`],
   synchronize: true
})