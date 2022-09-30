import { connection } from '../database.js';


export async function getCategories (req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories;')

        res.status(200).send(categories.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function insertCategories (req, res) {
    const { name } = req.body;

    if(name === '') return res.sendStatus(400);

    try {
        const nameCategorie = await connection.query('SELECT * FROM categories WHERE name=$1;',[name]);

        if (nameCategorie.rows.length > 0) return res.sendStatus(409);

        await connection.query('INSERT INTO categories (name) VALUES ($1);',[name]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}