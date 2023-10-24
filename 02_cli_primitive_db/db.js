const inquirer = require('inquirer');
const fs =require('fs/promises');
const path = require('path');
const usersPath =path.join(__dirname,  'users.txt');


let users =[];

const questions =[
    {
        type: 'input',
        name: 'user',
        message: 'Enter the user`s name to create a new user. To cancel press ENTER',    
        
    },
    {
       type: 'list' ,
       name: 'gender',
       message: 'Choose your gender',
       choices: ['male', 'female'],
       when: (answers) => {
        if (answers.user === '') {
            findUser();
            return false;
        } else {
            return true;
        }
    },
    
 
    },
    {
        type: 'input',
        name: 'age',
        message: 'Enter your age', 
        validate(value){
            const age = value.match(/^[0-9]+$/);
            if (age) {
                return true;
            };
            return 'Please enter your age in digits'
        },
        when: (answers) => answers.user !== ''
    }
];

async function getAllUsers() {
    const data= await fs.readFile(usersPath);
    return JSON.parse(data);
   };

async function addUser(answers) {
    const users = await getAllUsers();
   
    users.push(answers);
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
    return users;
  };

async function getUserByName(name) {
    const users = await getAllUsers();
    const result = users.find(user=>user.user.toLowerCase()===name.toLowerCase());
    if (!result) {
      return  console.log('User with such name does not exist in data base');
    }
    console.log(result);
  };



function createUser(){
inquirer.prompt(questions).then((answers)=>{
       if (answers.user!=='') {
        addUser(answers);
       
       }else{ 
        findUser();
        return;
       }
          
    createUser();
});
};


 function findUser (){
 inquirer.prompt([{  
type: 'confirm',
name: 'toFindUser',
message: 'Do you want to find the user by name in the database?',
default: false,
}])
.then(async (answers)=>{
if (!answers.toFindUser) {
    return;
}else{
    const list = await getAllUsers();
    console.log(list);
    inquirer.prompt([{
        type: 'input',
        name: 'user',
        message: 'Enter the user`s name that you want to find in DB',
    }]).then((answers)=>{
        if (answers.user!=='') {
            getUserByName(answers.user);
        }else{
            findUser ();
        }
        
    });
};
});

};

createUser();