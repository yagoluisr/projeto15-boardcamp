import joi from 'joi';



const insertCustomerSchema = joi.object({
    name: joi.string().empty().required(),
    phone: joi.string().min(10).max(11).empty().required(),
    cpf: joi.string().min(11).empty().required(),
    birthday: joi.string().isoDate().empty().required()
});


export function validateCustomer (req, res, next) {
    const { name, phone, cpf, birthday } = req.body;

    const validation = insertCustomerSchema.validate({ name, phone, cpf, birthday }, {abortEarly: false})

    if (validation.error) {
        const error = validation.error.details.map(obj => obj.message)
        return res.status(400).send(error);
    }

    res.locals.customer = { name, phone, cpf, birthday }
    next();
}