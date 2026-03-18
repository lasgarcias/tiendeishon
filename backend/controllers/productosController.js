const productoModel = require('../models/productoModel');

async function listarProductos(req, res, next) {
  try {
    const productos = await productoModel.getAllProductos();
    res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
}

async function crearProducto(req, res, next) {
  try {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({ error: 'El campo nombre es obligatorio.' });
    }

    const precioNumerico = Number(precio);
    const stockNumerico = stock === undefined ? 0 : Number(stock);

    if (Number.isNaN(precioNumerico) || precioNumerico < 0) {
      return res.status(400).json({ error: 'El campo precio debe ser un número mayor o igual a 0.' });
    }

    if (!Number.isInteger(stockNumerico) || stockNumerico < 0) {
      return res.status(400).json({ error: 'El campo stock debe ser un entero mayor o igual a 0.' });
    }

    const productoCreado = await productoModel.createProducto({
      nombre: nombre.trim(),
      descripcion,
      precio: precioNumerico,
      stock: stockNumerico
    });

    return res.status(201).json(productoCreado);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listarProductos,
  crearProducto
};
