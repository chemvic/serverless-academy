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
        validate(input){
            if (input==='') {
                return;
            }
            return;
        }
    },
    {
       type: 'list' ,
       name: 'gender',
       message: 'Choose your gender',
       choices: ['male', 'female'],
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
        console.log('User with such name does not exist in data base');
    }
    console.log(result);
  };

function usersList(){
inquirer.prompt(questions).then((answers)=>{
    console.log(JSON.stringify(answers, null, ' '));
    
    addUser(answers);
    usersList();
});

}


usersList();