import { connection } from '../database.js';
import dayjs from 'dayjs';

export async function getRentals (req, res) {
    const { customerId, gameId } = req.query;
    
    try {
        const rentals = await connection.query(
            'SELECT rentals.*,rentals.id AS "idTable",customers.id,customers.name AS "customerName",games.id,games.name,games."categoryId",categories.name AS "categoryName" FROM rentals JOIN customers ON rentals."customerId"=customers.id JOIN games ON rentals."gameId"=games.id JOIN categories ON games."categoryId"=categories.id;'
        );
        
        const rentalsList = rentals.rows.map( obj => 
            (
                {
                    id: obj.idTable,
                    customerId: obj.customerId,
                    gameId: obj.gameId,
                    rentDate: dayjs(obj.rentDate).format('YYYY-MM-DD'),
                    daysRented: obj.daysRented,
                    returnDate: obj.returnDate,
                    originalPrice: obj.originalPrice,
                    delayFee: obj.delayFee,
                    customer: {
                        id: obj.customerId,
                        name: obj.customerName 
                    },
                    game:{
                        id: obj.gameId,
                        name: obj.name,
                        categoryId: obj.categoryId,
                        categoryName: obj.categoryName
                    }
                }
            )
        );

        if(customerId) {
            const rentalsCustomer = rentalsList.filter(value =>  value.customerId === Number(customerId));
            return res.send(rentalsCustomer)
        }

        if(gameId) {
            const rentalsGamesCustomer = rentalsList.filter(value =>  value.gameId === Number(gameId));
            return res.send(rentalsGamesCustomer)
        }

        res.send(rentalsList);
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

export async function finishesRental (req, res) {
    const { id } = req.params;
    const today = dayjs().format("YYYY-MM-DD");

    try {
        const rentalIdFiltered = await connection.query(
            'SELECT * FROM rentals WHERE id = $1;', [id]
        );
        
        if(!rentalIdFiltered.rows[0]) return res.sendStatus(404);

        if(rentalIdFiltered.rows[0].returnDate != null) return res.sendStatus(400);

        await connection.query(
            'UPDATE rentals SET "returnDate"=$1 WHERE id=$2', [today,id]
        );

        const diffInDays = (new Date(today) - new Date(rentalIdFiltered.rows[0].rentDate)) / (1000 * 60 * 60 * 24);
        
        if (diffInDays > rentalIdFiltered.rows[0].daysRented) {

            let delayFeeCalc = Math.ceil(diffInDays - rentalIdFiltered.rows[0].daysRented) * (rentalIdFiltered.rows[0].originalPrice/rentalIdFiltered.rows[0].daysRented);
                        
            await connection.query(
                'UPDATE rentals SET "delayFee" = $1 WHERE id = $2 ;', [delayFeeCalc,id]
            );
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteRental (req, res) {
    const { id } = req.params;

    try {
        const hasIdRentals = await connection.query(
            'SELECT * FROM rentals WHERE id = $1', [id]
        );

        if(!hasIdRentals.rows[0]) return res.sendStatus(404);

        if(hasIdRentals.rows[0].returnDate === null) return res.sendStatus(400);

        await connection.query(
            'DELETE FROM rentals WHERE id = $1', [id]
        );
        
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}