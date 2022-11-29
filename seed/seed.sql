CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    is_admin boolean DEFAULT false
);

CREATE TABLE user_payments (
    id SERIAL PRIMARY KEY,
    payment_type varchar(50) NOT NULL,
    account_no varchar(50) NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users
);

CREATE TABLE user_addresses (
    id SERIAL PRIMARY KEY,
    address_line1 varchar(50) NOT NULL,
    address_line2 varchar(50),
    postal_code varchar(50) NOT NULL,
    country varchar(50) NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users
);

CREATE TABLE shopping_sessions (
    id SERIAL PRIMARY KEY,
    total numeric(7,2) NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    title varchar(50) UNIQUE NOT NULL,
    description varchar(250) NOT NULL,
    img_url varchar(450) NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title varchar(100) NOT NULL,
    description varchar(250) NOT NULL,
    gender varchar(50) NOT NULL,
    CHECK (gender IN ('men', 'women', 'kids')),
    size varchar(50) NOT NULL,
    quantity INT NOT NULL,
    is_best_seller boolean DEFAULT false,
    img_url varchar(450) NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    catergory_id INT REFERENCES categories
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    product_id INT REFERENCES products,
    shopping_session_id INT REFERENCES shopping_sessions
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users,
    user_payment_id INT REFERENCES user_payments,
    user_address_id INT REFERENCES user_addresses
);

CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    total_price numeric(7,2) NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    order_id INT REFERENCES orders,
    product_id INT REFERENCES products
);