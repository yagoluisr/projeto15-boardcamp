import express from 'express';
import { getGames } from '../Controllers/gamesController.js';

const router = express.Router();

router.get('/games', getGames);


export default router;