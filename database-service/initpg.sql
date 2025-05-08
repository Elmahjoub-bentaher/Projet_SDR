-- Create table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  base_price DOUBLE PRECISION
);

-- Seed data
INSERT INTO products (name, description, base_price) VALUES
('Laptop', 'High-performance gaming laptop', 55.09),
('Smartphone', 'Latest model with 5G support', 6.09),
('Headphones', 'Noise-cancelling wireless headphones', 7.90);
