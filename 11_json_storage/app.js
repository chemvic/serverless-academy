const express = require('express');

const app= express();

app.use(express.json());

const jsonBase = {};



const putToBase=(req, res)=>{
    const json_name =req.params.json_name; 
    const jsonPayload =req.body;

    jsonBase[json_name]=jsonPayload;

    console.log(json_name);
    console.log(jsonBase);
    res.status(201).json({
        "json_name": json_name,
 "jsonBase": jsonBase});
};

const getFromBase =(req, res)=>{
    const json_name =req.params.json_name;
    let jsonPayload;
    if (jsonBase[json_name]) {
        jsonPayload =jsonBase[json_name];
        console.log(jsonPayload);
    } else{
        res.status(404).json({message: "Not found"})
    }
    res.status(200).json({
        "json_name": json_name,
 "jsonPayload": jsonPayload});
}


app.put('/data/put/:json_name', putToBase);
app.get('/data/get/:json_name', getFromBase);


app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});