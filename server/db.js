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
      "select name, username, password from myuser where username = $1;",
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function getUserIDByUsername(username) {
  try {
    const result = await pool.query(
      "select id from myuser where username = $1",
      [username]
    );
    return result.rows[0].id;
  } catch (error) {
    console.log(error);
  }
}

export async function saveMessage(from, to, message) {
  try {
    const fromID = await getUserIDByUsername(from);
    if (!fromID) return `User with username: ${from} does not exist!`;
    const toID = await getUserIDByUsername(to);
    if (!toID) return `User with username: ${to} does not exist!`;

    await pool.query(
      "insert into message (fromID, toID, msg) values ($1, $2, $3);",
      [fromID, toID, message]
    );
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function getMessages(from, to) {
  try {
    const result = await pool.query(
      'select m1.username as "from", m2.username as "to", msg.msg from message as msg join myuser as m1 on msg.fromid = m1.id join myuser as m2 on msg.toid = m2.id where m1.username = $1 and m2.username = $2 or m1.username = $2 and m2.username = $1',
      [from, to]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
  }
}
