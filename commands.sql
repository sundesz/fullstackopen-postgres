CREATE TABLE blogs(
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INT DEFAULT 0
);


INSERT INTO blogs (author, url, title) VALUES ('Sandesh Hyoju', 'https://www.sandesh.com', 'My Blog');
INSERT INTO blogs (author, url, title, likes) VALUES ('Sajani Karmacharya', 'https://www.sajani.com', 'Your Blog', 5);