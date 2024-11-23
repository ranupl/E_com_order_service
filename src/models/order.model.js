const db = require('../db/connection');

const Order = {
    create: (userId, status, totalPrice, callback) => {
        const sql = `INSERT INTO orders (user_id, status, total_price, created_at, updated_at)
                     VALUES (?, ?, ?, NOW(), NOW())`;
        db.query(sql, [userId, status, totalPrice], callback);
    },

    findById: (id, callback) => {
        const sql = `SELECT * FROM orders WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    findByUserId: (userId, callback) => {
        const sql = `SELECT * FROM orders WHERE user_id = ?`;
        db.query(sql, [userId], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = `UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?`;
        db.query(sql, [status, id], callback);
    },

    deleteById: (id, callback) => {
        const sql = `DELETE FROM orders WHERE id = ?`;
        db.query(sql, [id], callback);
    },
};

module.exports = Order;
