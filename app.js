// BELOW IS THE REAFCTORED AND CLEANED UP CODE
const fs = require('fs');

// With this statement, the object in the module.exports assignment will be reassigned to the generatePage variable in the app.js file
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});


// BELOW IS THE CODE FROM EARLIER IN THE MODULE WHICH CONTAINS COMMENTS FOR EXPLANATION


/* // the following variable allows the app.js file to access the fs module's functions through the fs assignment
const fs = require('fs');

// profileDataArgs will collect command-line arguments and feed them to the generatePage function
const profileDataArgs = process.argv.slice(2, process.argv.length);

// store users name and github name. remember that profileDataArgs is an array. The varaibles are written this way to assign elements of an array to variable names in a single expression.
const [name, github] = profileDataArgs;

// This function returns a string. Let's break it down further to compare it to the arrow functions we created in the previous lesson. You might remember that parentheses are unnecessary in arrow functions when there is one parameter. In this function, which has no parameters, we need parentheses to hold the place where parameters would've been.
const generatePage = (name, github) => {
    return `
    <!DOCTYPE html> 
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
    </head>
  
    <body>
      <h1>${name}</h1>
      <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
};

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;
  
    console.log('Portfolio complete! Check out index.html to see the output!');
});
/* const printProfileData = profileDataArr => {
  // This...
  for (let i = 0; i < profileDataArr.length; i += 1) {
    console.log(profileDataArr[i]);
  }

  console.log('================');

  // Is the same as this...
  profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs); */ 
