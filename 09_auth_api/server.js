const app = require('./app');
require("dotenv").config();
const {PORT}= process.env;


// https://auth-api.learning.serverless.direct


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
