import { DataSource } from "typeorm";

export const testDataStore = new DataSource({
    name: `default`,
    type: `better-sqlite3`,
    database: `:memory:`,
    entities: [
        `src/entity/**/*.{ts,js}`
    ],
    synchronize: true
 })