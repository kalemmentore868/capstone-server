import { Client as PgClient } from "pg";
import { Client, types } from "pg";

const port = parseInt(process.env.DATABASE_PORT || "5340");

const db: PgClient = new Client({
  host: process.env.DATABASE_HOST,
  port,
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
});

//this is to ensure that numeric values return as numbers and not text
types.setTypeParser(1700, "text", parseFloat);

db.connect()
  .then(() => console.log("Connected to db"))
  .catch((err: Error) => console.log("Error", err));

export default db;
