const express = require('express');

const ctrl = require('./controllers/controllers');

const app= express();

app.use(express.json());



app.post('/shortLink', ctrl.makeShort );
app.get('/:shortCode', ctrl.reroute);


app.use((req, res, next) => {
    res.status(404).json({ success:true, error: "Not found" });
  });

app.use((err, req, res, next)=>{
const{status=500, message= "Server error"}=err;
res.status(status).json({message});
});
app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});