import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ppks",
  password: "postgres",
  port: 5432,
});

export async function createUser(name, username, password) {
  try {
    await pool.query(
      "insert into myuser (name, username, password) values ($1, $2, $3);",
      [name, username, password]
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByUsername(username) {
  try {
    const result = await pool.query(
      "select username, password from myuser where username = $1;",
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}
