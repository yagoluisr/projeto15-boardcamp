import express from 'express';
import categoriesRoutes from './Routes/categoriesRoutes.js'

const server = express();

server.use(express.json());

server.use(categoriesRoutes);




server.get('/status', async (req, res) => {
    res.send('OK');        
});

server.listen(4000, () => {
    console.log('Listenig on port 4000');
});