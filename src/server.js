import express from 'express';
import {getCategories, insertCategories} from './Controllers/categoriesController.js';

const server = express();
server.use(express.json());

server.get('/categories', getCategories);
server.post('/categories', insertCategories);


server.get('/status', async (req, res) => {
    res.send('OK');        
});

server.listen(4000, () => {
    console.log('Listenig on port 4000')
});