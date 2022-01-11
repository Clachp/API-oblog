const client = require('../database');


class CoreModel {

    // avec le # devant le nom de la propriété, on protège l'accès à cette propriété depuis l'extérieur
    // tout élément de notre appli en dehors de la classe CoreModel (et de ses enfants) ne pourra plus lire directement la valeur de la propriété
    #id;

    static tableName = null;

    constructor(obj) {
        this.#id = obj.id;
    }

    //getter nous permet de lire la valeur d'une propriété masquée
    //ça se déclare comme une méthode, ça s'utilise comme une propriété

    get id() {
        return this.#id;
    }

    // setter va permettre de mettre à jour la propriété cachée
    //on va pouvoir mettre un peu de logique pour vérifier qu'on ne met pas de valeur incohérente

    set id(value) {
        if (typeof value !== 'number') {
            console.log('Le champ id doit être de type number');
        } else {
            this.#id = value;
        }
    }


    static findAll(callback) {
        client.query(`SELECT * FROM "${this.tableName}"`, (error, result) => {
            if (error) {
                callback(error);
            } else {
                const instances = [];
                for (const row of result.rows) {
                    instances.push(new this(row));
                }
                callback(null, instances);
            }

        });
    }

    static findOne(id, callback) {
        client.query(`SELECT * FROM "${this.tableName}" WHERE id=$1`, [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                if(result.rows[0]) { //équivalent à result.rows[0] !== undefined
                    const instance = new this(result.rows[0]);
                    callback(null, instance);
                } else {
                    // dans le cas contraire, on prévient le contrôleur avec un nouveau message d'erreur
                    callback(`${this.name} with id ${id} doesn't exist`);
                }
            }
        })
    }

    static findBy(params, callback) {
        console.log('this contient', this);
        // SELECT * FROM level WHERE name='Difficile et piquant' AND id=9;
        // SELECT * FROM "user" WHERE firstname='Nicolas' AND lastname='Charpin';

        //on identifie les éléments commus et les éléments varibales dans les 2 requêtes :
        // ce qui va changer :
        //- le nom de la table
        //- les éléments à indiquer dans le where

        //dans le contexte static, le nom de la table est accessible à travers this (qui pointe sur la classe et donne accès aux propriétés statiques)

        //la boucle sur l'object params va permettre de récupérer les infos nécessaires pour le WHERE de la requête
        const filters = [];
        const values = [];

        let count = 1;

        //pour chaque propriété de l'object
        for (const propName in params) {
            console.log('propName', propName);
            console.log('value', params[propName])

            //on stocke la valeur associée
            values.push(params[propName]);

            //on stocke une string de la forme "<nom_propriété>"=$x
                        // "name"=$1
            filters.push(`"${propName}"=$${count}`);
//            filters.push('"'+propName+'"=$' + count);
            count++;
        }
        console.log('filters', filters);
        console.log('values', values);
        // SELECT * FROM ??? WHERE prop=$1 AND prop=$2 AND ...
        // on a toutes les infos utiles dans nos 2 tableaux, on peut générer la string SQL de la requête
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE ${filters.join(' AND ')}`,
            values
        };
        console.log(preparedQuery.text);
        client.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                //on peut éventuellement récupérer plusieurs enregistrements en base
                //on prévoit le coup en stockant les résultats dans un tableau d'instance

                //si on a reçu des résultats
                if (result.rows.length > 0) {
                    const instances = []
                    for (const data of result.rows) {
                        instances.push(new this(data));
                    }
                    callback(null, instances);
                } else {
                    //aucun résultat ne correspond à la requête
                    callback('Aucun enregistrement trouvé');
                }
            }
        });

    }

}

module.exports = CoreModel; 