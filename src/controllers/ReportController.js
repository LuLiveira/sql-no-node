const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res){
        //Encontrar todo usuário que tem email com @gmail.com.br.
        //Desses usuario buscar todos que moram na rua Pastor Alberto.
        //Desses usuários buscar as tecnologias que começam com React.
        const users = await User.findAll({
            attributes: [ 'name', 'email' ],
            where: {
                email: {
                    [Op.iLike]: '%@gmail.com'
                }
            },
            include: [{
                association: 'addresses', 
                where: { street: 'Rua Pastor Alberto Augusto' }
            }, {
                association: 'techs', 
                required: false,
                where: { name: { [Op.iLike]: 'React%' } }
            }]
        });
        return res.json(users);
    }
}