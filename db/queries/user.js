const pool = require("../pool");

async function getUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function getUserByEmail(email) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
    ]);
    return rows[0];
}

async function insertUser(firstname, lastname, email, password) {
    await pool.query(
        "INSERT INTO users (firstname, lastname, email, password) values ($1, $2, $3, $4)",
        [firstname, lastname, email, password]
    );
}

module.exports = { getUsers, getUserByEmail, getUserById, insertUser };
