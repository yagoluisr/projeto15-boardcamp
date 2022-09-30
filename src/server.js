import express from 'express';
import { connection } from './database.js';

const server = express();

server.get('/status', async (req, res) => {
    res.send('OK');        
});


server.listen(4000, () => {
    console.log('Listenig on port 4000')
});