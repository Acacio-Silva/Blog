const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const connection = require('./database/database')
const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');
const Category = require('./categories/Category');
const Article = require('./articles/Article');



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

app.use('/', categoriesController)
app.use('/', articlesController)


app.get('/', (req, res)=>{
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles=>{
        Category.findAll().then(categories =>{
            res.render('index', {articles: articles, categories: categories});
        })
    })
})

app.get('/:slug', (req, res)=>{
    var slug = req.params.slug
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render('article', {article: article, categories: categories});
            })
        }
        else{
            res.redirect('/')
        }
    }).catch(err =>{
        res.redirect('/')
    })
})

app.get('/category/:slug', (req, res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        },
        include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories})
            })
        }
        else{
            res.redirect('/')
        }
    }).catch(err =>{
        res.redirect('/')
    })
})

app.listen(8080, ()=>{
    console.log('app rodando!')
})