const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const mongoose = require('mongoose');

const cors = require('cors');



// Configuración
app.use(cors());
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.use(express.static('public'));

// Rutas
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api-dishes.vercel.app/');
    const dishes = response.data.state ? response.data.data : [];
    res.sendFile(__dirname + '/views/index.html', { dishes });
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
    res.status(500).send('Error al obtener los datos de la API');
  }
});

app.post('/insertDish', async (req, res) => {
  try {
    const newDish = req.body; 
    dishes.push(newDish);

    res.status(201).json({ message: 'Plato insertado correctamente', data: newDish });
  } catch (error) {
    console.error('Error al insertar el plato:', error);
    res.status(500).send('Error al insertar el plato');
  }
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');
 
});

app.get('/getDish/:id', async (req, res) => {
  try {
    const dishId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(400).json({ message: 'ID de plato no válido' });
    }

    const response = await axios.get(`https://api-dishes.vercel.app/${dishId}`);
    const dish = response.data.state ? response.data.data : null;

    if (!dish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }

    res.status(200).json(dish);
  } catch (error) {
    console.error('Error handling GET request for /getDish/:id:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Puerto
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
