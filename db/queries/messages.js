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

module.exports = { getMessages, addMessage };
