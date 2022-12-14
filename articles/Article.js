const Sequelize = require('sequelize');
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) //Uma categoria tem varios artigos, relacionamento 1:N - hasMany()
Article.belongsTo(Category) //um artigo pertence a uma categoria, relacionamento 1:1 -> belongsTo()

//Article.sync({force:true});

module.exports = Article;