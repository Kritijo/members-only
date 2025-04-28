const pool = require("../pool");

async function getUser() {
    const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
    ]);
    return rows[0];
}

module.exports = { getUser, getUserById };
