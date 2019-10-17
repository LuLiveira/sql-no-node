const Address = require('../models/Address');
const User = require('../models/User');

module.exports = {

    async index(req, res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        });

        if(!user){
            return res.status(400).json({ message: 'User not found. '});
        }

        return res.json(user);
    },

    async store(req, resp) {
        const { user_id } = req.params;
        const { zipcode, street, number } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return resp.status(400).json({ message: 'User not found.' }); 
        }

        const address = await Address.create({
            user_id,
            zipcode,
            street,
            number
        });

        return resp.json(address);
    }
}