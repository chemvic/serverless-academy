const express = require('express');

const app= express();

app.use(express.json());


app.put('/put',);
app.get('/get',);


app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});