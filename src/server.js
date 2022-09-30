import express from 'express';
import getCategories from './Controllers/categoriesController.js';

const server = express();

server.get('/categories', getCategories);



server.get('/status', async (req, res) => {
    res.send('OK');        
});

server.listen(4000, () => {
    console.log('Listenig on port 4000')
});