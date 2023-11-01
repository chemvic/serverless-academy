const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'files');


let startTime;
let finishTime;

async function grabAllFiles() {
    startTime=Date.now();

  const filesArrays = {};
   const files = await fs.readdir(folderPath);
  try {    

  for (let file of files) {
    const filePath = path.join(folderPath, file);
    const data = await fs.readFile(filePath, 'utf8');
    filesArrays[file] = data.split('\n');
  };
  
  return filesArrays;
  
  } catch (error) {
    console.error('Ошибка при чтении файла outN:', error);
  };
};



async function uniqueNames(){
    const filesArrays = await grabAllFiles();

    let allNames = [].concat(...Object.values(filesArrays));
  
    const uniqueNames = [...new Set(allNames)];

    finishTime=Date.now();
    const elapsedTime = (finishTime-startTime)/1000;  

    // console.log(uniqueNames);
    console.log(uniqueNames.length);  
    console.log(`elapsedTime: ${elapsedTime} s`);
    return uniqueNames.length;
  };



async function existInAllFiles() {
    const filesArrays = await grabAllFiles();
   
    let nameCounts = {};
  
    for (let names of Object.values(filesArrays)) {

        for (let name of [...new Set(names)]){
        if (!nameCounts[name]){
         nameCounts[name] = 0;             
        };
         nameCounts[name]+=1;
      } 
    }

  const quantityOfMatches = Object.values(nameCounts).filter(count => count === Object.keys(filesArrays).length).length;
    finishTime=Date.now();
    const elapsedTime = (finishTime-startTime)/1000;    

    console.log(quantityOfMatches);
    console.log(`elapsedTime: ${elapsedTime} s`);
    return quantityOfMatches;
  };





async function existInAtleastTen() {  
    const filesArrays = await grabAllFiles(); 

    let nameCounts = {};
  
    for (let names of Object.values(filesArrays)) {

        for (let name of [...new Set(names)]){
        if (!nameCounts[name]){
         nameCounts[name] = 0;             
        };
         nameCounts[name]+=1;
      } 
    }

  const quantityOfMatcheInAtleastTen = Object.values(nameCounts).filter(count => count >=10).length;
    finishTime=Date.now();
    const elapsedTime = (finishTime-startTime)/1000;    

    console.log(quantityOfMatcheInAtleastTen);
    console.log(`elapsedTime: ${elapsedTime} s`);
    return quantityOfMatcheInAtleastTen;
  };


uniqueNames();
existInAllFiles();
existInAtleastTen();

