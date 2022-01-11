const {Router} = require('express');
const postsController = require('./controllers/postsController');
const categoriesController = require('./controllers/categoriesController');

const postSchema = require('./schemas/postschema');
// destructuration 
const {validateBody} = require('./middlewares/validator');

const router = Router();

router.get('/', postsController.test);

/**
 * GET /v1/posts
 * @summary Responds with all posts in database
 * @route GET /v1/posts
 * @tags Posts
 * @returns {array<Post>} 200 - An array of posts
 */
router.get('/posts', postsController.getAllPosts);

/**
 * GET /v1/posts/{id}
 * @summary Responds with one post from database
 * @route GET /v1/posts/{id}
 * @tags Posts
 * @param {number} id.path.required The id of the post to fetch
 * @returns {Post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
 * 
 */
router.get('/posts/:id(\\d+)', postsController.getPostsbyId); 

/**
 * GET /v1/posts/categories/{id}
 * @summary Responds with posts from a specific category in database
 * @route GET /v1/posts/categories/{id}
 * @tags Posts
 * @param {number} id.path.required The id of the desired category
 * @returns {array<Post>} 200 - An array of posts with a specific category, can be empty
 */
 router.get('/posts/category/:id(\\d+)', postsController.getpostsByCategory); 

/**
 * GET /v1/categories
 * @summary Responds with all catagories in database
 * @route GET /v1/categories
 * @tags Categories
 * @returns {array<Categories>} 200 - An array of categories
 */
router.get('/categories', categoriesController.getCategories);

/**
 * Expected json object in request.body
 * @typedef PostJson
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {number} category_id
 */

/**
 * POST /v1/posts
 * @summary Add a new post in database
 * @tags Posts
 * @param {PostJson} request.body.required Post infos to add in database
 * @returns {Post} 201 - The newly created post
 * @returns {string} 500 - An error message
 */

 const myCustomMiddleware = validateBody(postSchema);
router.post('/posts', myCustomMiddleware, postsController.addPost);



module.exports = router; 