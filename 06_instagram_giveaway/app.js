const fs = require('fs/promises');
const path = require('path');

function uniqueNames(allNames){
console.log("start of unique");
  const uniqueNames = allNames.filter(
    (name, index, array) => array.indexOf(name) === index);
  console.log(uniqueNames);
  console.log(uniqueNames.length);  
};


const folderPath = path.join(__dirname, 'files');
``
async function grabAllFiles() {
  const filesArrays = {};
   const files = await fs.readdir(folderPath);
  try {    

  for (let file of files) {
    const filePath = path.join(folderPath, file);
    const data = await fs.readFile(filePath, 'utf8');
    filesArrays[file] = data.split('\n');
  };
  let allNames = [].concat(...Object.values(filesArrays));
  return allNames;
  
  } catch (error) {
    console.error('Ошибка при чтении файла outN:', error);
  };
};
grabAllFiles().then((allNames) => uniqueNames(allNames));




// async function readFile(){
//  const outFilePath = path.join(__dirname, 'files', 'out0.txt');
// try {
//     const data = await fs.readFile(outFilePath, 'utf8');
//     const names = data.split('\n');
    
//     console.log(names);
//     return names;
// } catch (error) {
//     console.error('Ошибка при чтении файла outN:', error);
// }   
// };

// // readFile();