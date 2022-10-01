import { connection } from '../database.js';

export async function getCustomers (req, res) {
    const { cpf } = req.query;

    try {
        if (!cpf) {
            const customers = await connection.query('SELECT * FROM customers;')
            return res.send(customers.rows)
        }

        const customersCpfFiltered = await connection.query(
            `SELECT * FROM customers WHERE cpf LIKE ($1 || '%')`, [cpf]
        );

        res.send(customersCpfFiltered.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}