import express from 'express';
import { getGames, insertGame } from '../Controllers/gamesController.js';

const router = express.Router();

router.get('/games', getGames);
router.post('/games', insertGame);


export default router;