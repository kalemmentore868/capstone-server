import { Client, types } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Client({
  host: process.env.RENDER_DATABASE_HOST, // e.g., 'dpg-********-a.oregon-postgres.render.com'
  //@ts-ignore
  port: process.env.RENDER_DATABASE_PORT, // e.g., 5432 (or whatever port your database uses)
  user: process.env.RENDER_DATABASE_USERNAME, // e.g., 'wte_user'
  password: process.env.RENDER_DATABASE_PASSWORD, // Your database password
  database: process.env.RENDER_DATABASE_NAME, // e.g., 'wte'
  ssl: {
    rejectUnauthorized: false, // Depending on the provider, you might need this to connect via SSL
  },
});

//this is to ensure that numeric values return as numbers and not text
types.setTypeParser(1700, "text", parseFloat);

db.connect()
  .then(() => console.log("Connected to db"))
  .catch((err: Error) => console.log("Error", err));

export default db;
