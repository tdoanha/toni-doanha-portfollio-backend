// controllers/postController.js

const Post = require('../models/posts');

const postController = {
  // Controller method to create a new post
  createPost: async (req, res) => {
    try {
      const { postTitle, postContent } = req.body;
      const newPost = await Post.create(postTitle, postContent);
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Controller method to get all posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.getAll();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error getting posts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Controller method to get a post by ID
  getPostById: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.getById(postId);
      res.status(200).json(post);
    } catch (error) {
      console.error('Error getting post by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Controller method to update a post
  updatePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const { postTitle, postContent } = req.body;
      const updatedPost = await Post.update(postId, postTitle, postContent);
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Controller method to delete a post
  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const deletedPost = await Post.delete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(204).end(); // 204 No Content
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = postController;
