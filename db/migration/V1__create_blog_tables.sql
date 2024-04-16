CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post_title VARCHAR(200),
  content TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted BOOLEAN DEFAULT FALSE
);