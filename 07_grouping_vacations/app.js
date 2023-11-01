const fs = require('fs/promises');
const path = require('path');

const jsonPath =path.join(__dirname, 'data.json');

async function getData (){
try {
    const data =await fs.readFile(jsonPath);
  
    // console.log(JSON.parse(data));
const originalData =JSON.parse(data);
    return originalData;

} catch (error) {
    console.log(error);
}
};

let transformedJson;
const transformedData=[];


async function transformJson (){
    const originalData = await getData();

    for(let i = 0; i < originalData.length; i+=1) {

        const mentionedUser = transformedData.find(item=>item.userId===originalData[i].user._id);

        if (mentionedUser) {
            const newVacation={
                startDate: originalData[i].startDate,
                endDate: originalData[i].endDate
            };
            mentionedUser.vacations.push(newVacation);

        }else
        {
            const newUser = {
            userId: originalData[i].user._id,
            userName: originalData[i].user.name,
            vacations: [
                {
                    startDate: originalData[i].startDate,
                    endDate: originalData[i].endDate

                },
            ]            
        };
        transformedData.push(newUser); 
        };
       

      };
      transformedJson=JSON.stringify(transformedData, null, 2);
      console.log(transformedJson);
     return transformedJson;
};

transformJson();