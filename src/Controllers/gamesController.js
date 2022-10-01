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

export async function insertGame (req, res) {
    const { name, image, stockTotal, pricePerDay, categoryId } = req.body;

    if(!name || stockTotal <= 0 || pricePerDay <= 0 ) return res.sendStatus(400);

    try {
        
        const hasIdCategoriy = await connection.query(
            'SELECT * FROM categories WHERE id = $1;', [categoryId]
        );

        const hasName = await connection.query(
            'SELECT * FROM categories WHERE name = $1;',[name]
        );

        if(hasIdCategoriy.rows.length === 0 || hasName.rows.length > 0) return res.sendStatus(400);

        await connection.query(
            'INSERT INTO games (name, image, "stockTotal", "pricePerDay", "categoryId") VALUES ($1,$2,$3,$4,$5)', [name, image, stockTotal, pricePerDay, categoryId]
        );

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}