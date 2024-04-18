// routes/postRoutes.js

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Define routes
router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/recentPosts');
router.get('/:postId', postController.getPostById);
router.put('/', postController.updatePost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
