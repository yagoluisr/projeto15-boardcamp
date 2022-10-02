import { connection } from '../database.js';
import dayjs from 'dayjs';

export async function getRentals (req, res) {
    try {
        
        res.send('OKKK');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function insertRental (req, res) {
    const { customerId, gameId, daysRented } = req.body;

    if(typeof(daysRented) === 'string' || daysRented <= 0) return res.sendStatus(400)

    try {

        const hasCustomerId = await connection.query(
            'SELECT * FROM customers WHERE id = $1 ;', [customerId]
        );

        if(!hasCustomerId.rows[0]) return res.sendStatus(400);

        const game = await connection.query(
            'SELECT * FROM games WHERE id = $1 ;', [gameId]
        );

        if(!game.rows[0]) return res.sendStatus(400);

        const canRent = await connection.query(
            'SELECT * FROM rentals WHERE "gameId" = $1 ;', [gameId]
        );

        if(canRent.rows.length >= game.rows[0].stockTotal) return res.sendStatus(400);

        await connection.query(
            'INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7);', [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, null,daysRented * game.rows[0].pricePerDay, null]
        );

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}