// models/post.js

const { Pool } = require('pg');
const env = require('dotenv');

env.config();

// Create a new Pool instance with database connection configuration
const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT
});

// Define the Post model methods
const Post = {
  // Method to create a new post
  async create(postTitle, postContent) {
    const query = 'INSERT INTO posts (post_title, content, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
    const values = [postTitle, postContent];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Method to get all posts
  async getAll() {
    const query = 'SELECT * FROM posts WHERE deleted = FALSE';
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query);
      return rows;
    } finally {
      client.release();
    }
  },
  // Method to retrieve the 5 most recent posts
  async getRecentPosts() {
    const query = `
      SELECT * FROM posts
      ORDER BY created_at DESC
      LIMIT 5
    `;
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query);
      return rows;
    } finally {
      client.release();
    }
  },
  // Method to get a post by ID
  async getById(postId) {
    const query = 'SELECT * FROM posts WHERE id = $1 AND deleted = FALSE';
    const values = [postId];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Method to update a post
  async update(postId, postTitle, postContent) {
    const query = 'UPDATE posts SET post_title = $2, content = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *';
    const values = [postId, postTitle, postContent];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Method to delete a post
  async delete(postId) {
    const query = 'UPDATE posts SET deleted = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *';
    const values = [postId];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  }
};

module.exports = Post;
