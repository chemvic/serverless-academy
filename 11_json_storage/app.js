const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const app= express();

app.use(express.json());

let jsonBase = {};
const dataBasePath =path.join(__dirname,"database.txt");

const putToBase= async (req, res)=>{
    const json_name =req.params.json_name; 
    const jsonPayload =req.body;
    
    try {    
    let fileData = await fs.readFile(dataBasePath);

    jsonBase = fileData ? JSON.parse(fileData) : {}; 

       if (jsonBase[json_name]) {
       return res.status(409).json({message: "This json name already exists"});
       };
       jsonBase[json_name]=jsonPayload;
    
       await fs.writeFile(dataBasePath, JSON.stringify(jsonBase, null, 2));
    } catch (error) {
        console.log(error);
    };

    console.log(json_name);
    res.status(201).json({
        "json_name": json_name,
        "jsonPayload": jsonPayload
    })
};

const getFromBase = async(req, res)=>{
    const json_name =req.params.json_name;
    let jsonPayload;
    try {
        let fileData = await fs.readFile(dataBasePath);
        jsonBase = fileData ? JSON.parse(fileData) : {};
         if (jsonBase[json_name]) {
        jsonPayload =jsonBase[json_name];
        console.log(jsonPayload);
    } else{
       return res.status(404).json({message: "Not found"});
    } 
    } catch (error) {
        console.log(error);
    };   
    res.status(200).json({
        "json_name": json_name,
         "jsonPayload": jsonPayload});
}


app.put('/data/put/:json_name', putToBase);
app.get('/data/get/:json_name', getFromBase);


app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});