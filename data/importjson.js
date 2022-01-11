// Ce script permet de récupérérer les données des tables JSON en data dans la BDD

require('dotenv').config();

const categories = require('./categories.json');
const posts = require('./posts.json');

const client = require('../app/database'); 

const importData = async () => {

    // Je vide d'abord les tables 
    await client.query('TRUNCATE post, category RESTART IDENTITY');

    const categoriesIds = {};

    for(const category of categories) {
        const {rows} = await client.query('INSERT INTO category(route, label) VALUES ($1,$2) RETURNING id', [category.route, category.label]); 
        categoriesIds[category.label] = rows[0].id; 
    }
    console.log(categoriesIds);

    for(const post of posts) {
        const categoryId = categoriesIds[post.category]; 
        await client.query('INSERT INTO post (slug, title, excerpt, content, category_id) VALUES ($1, $2, $3, $4, $5)',
        [post.slug, post.title, post.excerpt, post.content, categoryId]); 
    }
    //console.log(posts);
    client.end();
};

importData();
