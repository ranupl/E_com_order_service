const db = require('../db/connection');

const OrderItem = {
    create: (orderId, productId, quantity, price, callback) => {
        const sql = `INSERT INTO order_items (order_id, product_id, quantity, price)
                     VALUES (?, ?, ?, ?)`;
        db.query(sql, [orderId, productId, quantity, price], callback);
    },

    findByOrderId: (orderId, callback) => {
        const sql = `SELECT * FROM order_items WHERE order_id = ?`;
        db.query(sql, [orderId], callback);
    },

    update: (id, quantity, price, callback) => {
        const sql = `UPDATE order_items SET quantity = ?, price = ? WHERE id = ?`;
        db.query(sql, [quantity, price, id], callback);
    },

    deleteById: (id, callback) => {
        const sql = `DELETE FROM order_items WHERE id = ?`;
        db.query(sql, [id], callback);
    },
};

module.exports = OrderItem;
