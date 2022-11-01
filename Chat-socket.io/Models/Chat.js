const Sequelize = require("sequelize")

module.exports = (sequelize, dataTypes) =>{
    return sequelize.define("chat", {
        name: Sequelize.STRING,
        message: Sequelize.STRING,
        room: Sequelize.STRING
    })
}