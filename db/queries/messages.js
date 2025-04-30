const pool = require("../pool");

async function getMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

async function addMessage(user_id, title, text) {
    await pool.query(
        "INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)",
        [user_id, title, text]
    );
}

async function viewMessage(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id=$1", [
        id,
    ]);
    return rows[0];
}

async function getUsername(id) {
    const result = await pool.query(
        "SELECT email FROM users u JOIN messages m ON u.id=m.user_id WHERE m.id=$1",
        [id]
    );
    return result.rows[0]?.email;
}

module.exports = { getMessages, addMessage, viewMessage, getUsername };
