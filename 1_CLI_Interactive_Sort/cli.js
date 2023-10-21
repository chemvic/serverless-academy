const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout,
});

const sortItems = ()=>{
  rl.question('Enter a few words or numbers separated by a space... ', (answer) => {
    
    const items = answer.split(' ');
    const words =items.filter((item)=>isNaN(item));
    const numbers = items.filter((item)=>!isNaN(item)).map(Number);
    
    if (answer==='exit') {
      rl.close();
    };

      rl.question(`Choose what would you like to see in the output.
       Enter the number of your choice or type exit to stop the programm. 
       1. Sort words alphabetically 
       2. Show numbers from lesser to greater 
       3. Show numbers from bigger to smaller 
       4. Display words in ascending order by number of letters in the word 
       5. Show only unique words 
       6. Display only unique values from the set of words and numbers entered by the user: `, 
   (choice)=>{
    
    switch (choice) {
      case 'exit':
        rl.close();
        break;
        case '1':
          const inAlphabeticalOrder = words.sort((a, b) => a.localeCompare(b));
          console.log(inAlphabeticalOrder);
        break;
        case '2':
          const ascendingNumbers = numbers.sort((a, b) => (a - b));
          console.log(ascendingNumbers);
        break;
        case '3':
          const descendingNumbers = numbers.sort((a, b) => (b - a));
          console.log(descendingNumbers);
        break;
        case '4':
          const ascendingByLetters = words.sort((a, b) => (a.length - b.length));
          console.log(ascendingByLetters);
        break;
        case '5':
          const uniqueWords = words.filter(
            (word, index, array) => array.indexOf(word) === index);
          console.log(uniqueWords);
        break;
        case '6':
          const uniqueItems = items.filter(
            (item, index, array) => array.indexOf(item) === index);
          console.log(uniqueItems);
        break;
        
      default:
        console.log('Incorrect choice');
        
    }
 sortItems();
   });   
  });
};
  sortItems();

