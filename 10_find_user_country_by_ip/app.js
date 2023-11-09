const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');


const app= express();

app.use(express.json());

let ipBase=[];
const csvPath =path.join(__dirname,  'IP2LOCATION.CSV');


function getIpBase() {
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => {
          ipBase.push(Object.values(data));
        })
        .on('end', () => {
          resolve(ipBase);
        })
        .on('error', (error) => reject(error));
    });
  };

 function transformToDecimal (userIp){
    const [a, b, c ,d]=userIp.split('.').map(Number);
    const inDecimal = (16777216*a)+(65536*b)+(256*c)+d;
    return inDecimal;
 };

 function transformToIp4 (ipInDecimal){
    let octets = [];
    for (let i = 0; i < 4; i+=1) {
        octets.unshift(ipInDecimal % 256);
        ipInDecimal = Math.floor(ipInDecimal / 256);
    }
    return octets.join('.');
 };

 function findCountry(inDecimal){
    for (const country of ipBase){
        if (Number(country[0])<=inDecimal && inDecimal<=Number(country[1])) {
            return country;
        };
    };
    return false;
 };

  const findUserByIp = async (req, res, next) => {
    const userIp= req.body.ip;
    try {
      ipBase = await getIpBase();
      const inDecimal = transformToDecimal(userIp);
      const country = findCountry(inDecimal);

      if (!country) {      
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
        return;
    }


      const ipRangeFrom = transformToIp4 (country[0]);
      const ipRangeTo = transformToIp4 (country[1]);
      console.log(`ip: ${userIp},\nipRangeFrom: ${ipRangeFrom},\nipRangeTo: ${ipRangeTo},\ncountry: ${country[2]}`);
res.status(200).json({"ip":userIp,
    "ipRangeFrom": ipRangeFrom,
    "ipRangeTo": ipRangeTo,
    "country":country[2]
    });
      } catch (error) {
        console.error(error);
        next(error); 
      };    
  };


 app.get('/someAddress', findUserByIp);

 app.use((err, req, res, next)=>{
    const{status=500, message= "Server error"}=err;
    res.status(status).json({message});
    });

module.exports = app;



 