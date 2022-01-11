const client =require('../database');

/**
 * An entity representing a blog post category
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} route
 * @property {string} label
 */
class Category {

    /**
     * The Category constructor
     * @param {Object} obj a litteral object with properties copied into the instance
     */
    constructor(obj= {}) {
        for(const propName in obj) {
            this[propName] = obj[propName]; 
        }
    }

    /**
     * Fetches all categories from the database
     * @returns {Array<Category>}
     * @static
     * @async
     */
    //SELECT => méthode statique 
    static async findAll() {
        // Desctructuration : je ne récupère qu'une partie du résultat de la requête qui m'intéresse 
        const {rows} = await client.query('SELECT * FROM post'); 
        return rows.map(row => new Category(row)); 
    }
}

module.exports = Category;