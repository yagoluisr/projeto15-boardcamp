import express from 'express';
import categoriesRoutes from './Routes/categoriesRoutes.js'
import gamesRoutes from './Routes/gamesRoutes.js'

const server = express();

server.use(express.json());

//Rotas de categorias
server.use(categoriesRoutes);

//Rotas de games
server.use(gamesRoutes);


server.get('/status', async (req, res) => {
    res.send('OK');        
});

server.listen(4000, () => {
    console.log('Listenig on port 4000');
});