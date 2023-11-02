const axios =require('axios');

const ENDPOINTS = [
'https://jsonbase.com/sls-team/json-793',
'https://jsonbase.com/sls-team/json-955',
'https://jsonbase.com/sls-team/json-231',
'https://jsonbase.com/sls-team/json-931',
'https://jsonbase.com/sls-team/json-93',
'https://jsonbase.com/sls-team/json-342',
'https://jsonbase.com/sls-team/json-770',
'https://jsonbase.com/sls-team/json-491',
'https://jsonbase.com/sls-team/json-281',
'https://jsonbase.com/sls-team/json-718',
'https://jsonbase.com/sls-team/json-310',
'https://jsonbase.com/sls-team/json-806',
'https://jsonbase.com/sls-team/json-469',
'https://jsonbase.com/sls-team/json-258',
'https://jsonbase.com/sls-team/json-516',
'https://jsonbase.com/sls-team/json-79',
'https://jsonbase.com/sls-team/json-706',
'https://jsonbase.com/sls-team/json-521',
'https://jsonbase.com/sls-team/json-350',
'https://jsonbase.com/sls-team/json-64'
];


async function endpointRequest(endpoint) {  
   
    for (let index = 1; index <= 3; index += 1) {
      try {
        const response = await axios.get(endpoint);
        if (response.data !== undefined && response.data !== null && response.data !== '') {
          return response.data;          
          break; 
        }else
        {
            console.log('The request is empty');
         }; 
      } catch (error) {
        // console.log(error.message);
      }
    };
      return false;
};


 function findIsDone (data){
    if (!data) {
        return false;
    };
    if (data.hasOwnProperty('isDone')) {
        return data.isDone;
    };
    for (let key in data){
        if(typeof (data[key])==='object'){
            const result = findIsDone(data[key]);
            if (result) {
                return 'isDone';
            };
        };
    };
    return 'isNotDone';
};
 
async function endpointsChecker (){
    let isTrue =0;
    let isFalse =0;
    
    for (let endpoint of ENDPOINTS) {
        const data = await endpointRequest(endpoint);
        const result = findIsDone(data);
        if (!result) {
            console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
        }else if(result==='isDone')
        {
            isTrue+=1;
            console.log(`[Success] ${endpoint}: isDone - True`);
        }else if(result==='isNotDone'){
            isFalse+=1;
             console.log(`[Success] ${endpoint}: isDone - False`);
        };
        
    };
    console.log(`Found True values: ${isTrue}`);
    console.log(`Found False values: ${isFalse}`);

};

endpointsChecker();




