import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ppks",
  password: "postgres",
  port: 5432,
});

export async function getAllUsers() {
  try {
    const result = await pool.query("select * from myuser;");
    return result.rows;
  } catch (error) {
    console.log(error);
  }
}
