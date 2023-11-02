const axios =require('axios');

const endpoints = [
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


async function endpointsChecker() {

  for (let endpoint of endpoints) {
   
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
        console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
      }
    }
    
  }
};



endpointsChecker();




