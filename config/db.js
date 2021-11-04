const Sequelize = require('sequelize')

const sequelize = new Sequelize('notebook','root', '010718',{
    host: "localhost",
    dialect: 'mysql'
})

const conectar = function(){
    sequelize.authenticate().then(()=>{
        console.log("Conectado ao DB")
    }).catch((erro)=>{
        console.log("erro "+erro)
    })
}

exports.conectar = conectar
exports.sequelize = sequelize
exports.Sequelize = Sequelize