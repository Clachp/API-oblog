require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const cors = require ('cors');

const app = express();

const port = process.env.PORT || 5000;

const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'Oblog API',
    description: 'A blog REST API',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: __dirname, //Pointe sur le repertoire principal
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js', // Consulte tous les fichiers.js du projet
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  // multiple: true,
};

// On passe l'app express en paramètre, puis on ré-exécute cette fonction
// en passant l'objet de config en argument
expressJSDocSwagger(app)(options);
app.use((request, response, next) => {
  console.log('passé par là')
  next();
})

app.use(cors());

app.use(express.json());

app.use('/v1', router); 

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});