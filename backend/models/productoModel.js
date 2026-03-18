const db = require('../db');

async function getAllProductos() {
  const [rows] = await db.query(
    'SELECT id, nombre, descripcion, precio, stock, created_at FROM productos ORDER BY id DESC'
  );
  return rows;
}

async function createProducto({ nombre, descripcion, precio, stock }) {
  const [result] = await db.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
    [nombre, descripcion || null, precio, stock ?? 0]
  );

  const [rows] = await db.query(
    'SELECT id, nombre, descripcion, precio, stock, created_at FROM productos WHERE id = ?',
    [result.insertId]
  );

  return rows[0];
}

module.exports = {
  getAllProductos,
  createProducto
};
