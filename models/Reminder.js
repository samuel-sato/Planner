const Sequelize = require('sequelize')
const db = require('../config/db')

const Reminder = db.sequelize.define('reminder',{
    lembrete: {
        type:  Sequelize.TEXT
    },
    
    data: {
        type:  Sequelize.DATE
    }
})


//cria tabela 
//Reminder.sync({forcce: true})

module.exports = Reminder