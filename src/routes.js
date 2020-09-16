const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();
const upload = multer(uploadConfig);

const postController = new PostController();
const likeController = new LikeController;

routes.get('/posts', postController.index);
routes.post('/posts', upload.single('image'), postController.store);

routes.post('/posts/:id/like', likeController.store);

module.exports = routes;
