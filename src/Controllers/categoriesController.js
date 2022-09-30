import { connection } from '../database.js';


export default async function getCategories (req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories;')

        res.status(200).send(categories.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}