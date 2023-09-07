import { Client, Pool, types } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Pool({
  connectionString: process.env.POSTGRES_STRING,
});

//this is to ensure that numeric values return as numbers and not text
types.setTypeParser(1700, "text", parseFloat);

db.connect()
  .then(() => console.log("Connected to db"))
  .catch((err: Error) => console.log("Error", err));

export default db;
