const express = require("express")
const app = express()
const sequelize = require('sequelize')
const mysql = require('mysql2')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const db = require('./config/db');

//conectando ao banco de dados 
db.conectar()
const Reminder = require('./models/Reminder')
const { DATE } = require("sequelize")

//Handlebars
app.engine('handlebars', handlebars({
    defaultLaout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set('view engine', 'handlebars')

//BodyParser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//

app.get('/', (req, res)=>{
    //res.send('Olá mundo!')
    res.render('home')
})
app.get('/reminder',(req, res)=>{
    Reminder.findAll().then((reminder)=>{
        res.render('admin/reminder', {reminder: reminder})
    }).catch((erro)=>{
        res.send("erro"+ erro)
    })
    
})
app.get('/addReminder',(req,res)=>{
    res.render('admin/addReminder')
})
app.post('/addReminder',(req,res)=>{
    Reminder.create({
        lembrete: req.body.reminder,
        data: Date.now()
    }).then(()=>{
        //res.send('enviou')
        res.redirect('/reminder')
    }).catch((erro)=>{
        res.send('deu erro '+erro)
    })
})
app.get('/editReminder/:id', (req,res)=>{
    Reminder.findOne({where : {'id':req.params.id}}).then((parametro)=>{

        res.render('admin/editReminder',{parametro: parametro})
        //console.log(req.params.id)
        
    }).catch((erro)=>{
        res.redirect('/reminder')
    })
})
app.post('/editReminder/:id',(req,res)=>{
    
    Reminder.update(
        {lembrete: req.body.reminder},
        {where: {'id':req.params.id}}
    ).then(()=>{
        res.redirect('/reminder')
    }).catch((erro)=>{
        //console.log('---------'+req.body.id)
        console.log("DEU ERRO: "+erro)
    })
    
})
app.get('/delReminder/:id', (req,res)=>{
    Reminder.destroy({where: {'id': req.params.id}}).then(()=>{
        res.redirect('/reminder')
    }).catch((erro)=>{
        res.send('erro'+erro)
    })
})
app.listen(3000, console.log("Aplicaçã rodando"))