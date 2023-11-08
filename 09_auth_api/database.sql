CREATE TABLE users(id SERIAL PRIMARY KEY, uuid UUID DEFAULT uuid_generate_v4(), email VARCHAR(30) NOT NULL UNIQUE CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$'),password VARCHAR(100));
     
   

