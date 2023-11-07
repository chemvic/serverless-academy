const app = require('./app');

const PORT= process.env.PORT || 3000;

// https://auth-api.learning.serverless.direct


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
