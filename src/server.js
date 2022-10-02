import express from 'express';
import categoriesRoutes from './Routes/categoriesRoutes.js'
import gamesRoutes from './Routes/gamesRoutes.js'
import customersRoutes from './Routes/customersRoutes.js'
import rentalsRoutes from './Routes/rentalsRoutes.js'

const server = express();

server.use(express.json());

//Rotas de categorias
server.use(categoriesRoutes);

//Rotas de games
server.use(gamesRoutes);

//Rota de clientes
server.use(customersRoutes);

//Rotas de aluguéis
server.use(rentalsRoutes);

server.get('/status', async (req, res) => {
    res.send('OK');        
});

server.listen(4000, () => {
    console.log('Listenig on port 4000');
});