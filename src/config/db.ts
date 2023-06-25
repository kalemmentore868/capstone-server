import { Client, types } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Client({
  connectionString:
    "postgresql://kalemmentore868:wSVqkEM2zob7@ep-summer-firefly-928803.us-east-2.aws.neon.tech/neondb?sslmode=require",
});

//this is to ensure that numeric values return as numbers and not text
types.setTypeParser(1700, "text", parseFloat);

db.connect()
  .then(() => console.log("Connected to db"))
  .catch((err: Error) => console.log("Error", err));

export default db;
