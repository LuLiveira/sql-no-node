const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');

const models = [User, Address, Tech];

class DatabaseConfig {
    constructor(){
        this.connection = new Sequelize(dbConfig)
        this.init()
        this.associate()
    }

    init(){
        models.map(model => {
            model.init(this.connection);
        });
    }

    associate(){
        Address.associate(this.connection.models);
        User.associate(this.connection.models);
        Tech.associate(this.connection.models);
    }
}

module.exports = new DatabaseConfig;