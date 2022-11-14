const express = require("express");
const visRoutes = express.Router();
const {createArticle,
    getAllArticles,
    getSingleArticle,
    updateArticle,
    deleteArticle,getArticleByCategory,} = require('../controllers/it20261900/article');

    visRoutes.post('/create', createArticle);
    visRoutes.get('/articles', getAllArticles);
    visRoutes.get('/articles/:id', getSingleArticle);
    visRoutes.put('/update/:id', updateArticle);
    visRoutes.delete('/delete/:id', deleteArticle);
    visRoutes.get('/get/:category', getArticleByCategory);


module.exports = visRoutes;
