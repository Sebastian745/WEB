const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let inventario = [];

app.get('/api/inventario', (req, res) => {
    res.json(inventario);
});

app.post('/api/inventario/agregar', (req, res) => {
    const { nombre, cantidad } = req.body;
    const producto = { nombre, cantidad };
    inventario.push(producto);
    res.status(201).json(producto);
});

app.put('/api/inventario/editar/:id', (req, res) => {
    const id = req.params.id;
    const { cantidad } = req.body;
    inventario[id].cantidad = cantidad;
    res.status(200).json(inventario[id]);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});