require("dotenv").config();
const bcrypt = require("bcryptjs");
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(254) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  text VARCHAR(500) NOT NULL,
  added TIMESTAMP DEFAULT NOW()
);`;

async function main() {
    console.log("seeding...");

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    await client.connect();
    await client.query(SQL);

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const res = await client.query(
        `INSERT INTO users (firstname, lastname, email, password, is_admin)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO NOTHING
         RETURNING id;`,
        ["Kit", "jo", process.env.ADMIN_EMAIL, hashedPassword, true]
    );

    const userId = res.rows[0]?.id;

    if (userId) {
        await client.query(
            `INSERT INTO messages (user_id, title, text)
             VALUES ($1, $2, $3);`,
            [
                userId,
                "Hi there!",
                `Welcome to the members-only club! This is a chill space to share messages, catch up with others, and stay in the loop. Once you're signed in, feel free to post, browse, and join the conversation. Say hey when you're ready!`,
            ]
        );
    }

    await client.end();
    console.log("done");
}

main();
