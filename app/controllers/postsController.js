const { request, response } = require('express');
const Post  = require('../models/posts');

console.log(Post);

const postsController = {

    test: (_, response) => {
        console.log('yes yes');
       
        response.send ('Architecture en place');
    },

    getAllPosts: async (_, response) => {

        try {
            const posts = await Post.findAll();
            response.json(posts);

        } catch (error) {
            console.log('erreur dans getAllPosts', error);
            response.status(500).json(error); 
        }
        
    },

    getPostsbyId: async (request, response) => {

        try {
            const id = Number(request.params.id);
            const post = await Post.findOne(id);
            response.json(post);
       
        } catch (error) {
            console.log('erreur dans getPostsById', error);
            response.status(500).json(error);

        } 
    },

    getpostsByCategory: async (request, response) => {
        const catId = Number(request.params.id);
        const posts = await Post.findbyCategory(catId); 
        response.json(posts);
    },

    addPost: async (request, response) =>{
        const post = new Post(request.body);
        console.log('avant save', post);

        try {
            await post.save();
            console.log('après save', post)
            response.status(201).json(post); 
        } catch(error) {
            response.status(500).json(error.message);
        }
        
    }

}

module.exports = postsController; 