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

export async function getUser(username) {
  try {
    const result = await pool.query("select username, password from myuser where username = $1", [username])
    return result.rows[0];
  } catch (error) {
    console.log(error)
  }
}
