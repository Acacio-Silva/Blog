const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const connection = require('./database/database')

//view engine
app.set('view engine', 'ejs')

//arquivos estaticos
app.use(express.static('public'))

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection
    .authenticate()
    .then(()=>{
        console.log('sucess conncetion')
    }).catch((error)=>{
        console.log(error)
});


app.get('/', (req, res)=>{
res.render('index');
})

app.listen(8080, ()=>{
    console.log('app rodando!')
})