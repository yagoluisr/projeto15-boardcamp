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

export async function getCustomersId (req, res) {
    try {
        const customersIdFiltered = await connection.query(
            'SELECT * FROM customers WHERE id = $1', [req.params.id]
        );

        if(customersIdFiltered.rows.length === 0) return res.sendStatus(404);

        res.send(customersIdFiltered.rows[0])
    } catch (error) {
        res.status(500).send(error.message);
    }
}