const Category = require("../models/categories");

console.log(Category);

const categoriesController = {

    test: (_, response) => {
        response.send ('Architecture en place');
    },

    getCategories: async (_, response) =>{
        try {
            const categories = await Category.findAll();
            response.json(categories);

        } catch (error) {
            console.log('Voilà l\'erreur', error);
            response.status(500).json(error); 
        }
        
    },

    getCategoriesById: (request,response) => {
        
    }

}

module.exports = categoriesController; 