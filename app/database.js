//SOC : ce module va uniquement gérer la connexion à la BDD

//import de la classe Pool du package pg
const {Pool} = require('pg');

const config = {
    connectionString:process.env.DATABASE_URL
}

if (process.env.NODE_ENV === 'production') {
    // Je dois adapter ma config car je suis sur l'env heroku
    config.ssl = {
        rejectUnauthorized : false
    }
}
const pool = new Pool(config);

console.log(`Connection to DB successful`);

module.exports = pool;