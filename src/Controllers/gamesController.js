import { connection } from '../database.js';

export async function getGames (req, res) {
    const { name } = req.query;

    try {
        if (!name) {
            const games = await connection.query(
                'SELECT games.*,categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id;'
            );
            return res.send(games.rows);
        } 

        const gamesFiltered = await connection.query(
            `SELECT games.*,categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id WHERE games.name ILIKE ($1 || '%');`,[name]
        );

        res.send(gamesFiltered.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}