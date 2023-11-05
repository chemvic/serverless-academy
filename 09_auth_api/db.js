const Pool = require('pg').Pool;
const pool = new Pool(options:{
    user: 'vic',
    password: 'yuzhne',
    host: "localhost",
    port:5432,
    database:'', 
});
module.exports = pool;
/^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

