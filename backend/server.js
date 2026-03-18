require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./db');
const productosRoutes = require('./routes/productosRoutes');

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

app.use('/', productosRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
