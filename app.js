const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });

/* const fs = require('fs');

const generatePage = require('./src/page-template');

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        // Notice that the validate method receives an argument. This argument is the user's input, nameInput. If the condition evaluates to true, the validation has passed successfully. However, if the condition evaluates to false, the user receives a message and is prompted with the same question until an answer is received.
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: githubInput => {
            if (githubInput) {
              return true;
            } else {
              console.log('Please enter your GitHub username!');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true,
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        // when is like the validate method we used previously, but instead of passing the value entered for that specific question in as the parameter, it passes an object of all of the answers given so far as an object. The user is only prompted for the information regarding the About section if the user answers yes to the request.
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
        }
      }
    ]);
};

const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one. In other words, you only want this to happen on the first pass, so use conditional staement to make sure !portfolioData.projects doesn't exist yet
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: projectNameInput => {
            if (projectNameInput) {
              return true;
            } else {
              console.log('Please enter your project name!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projectDescriptionInput => {
            if (projectDescriptionInput) {
              return true;
            } else {
              console.log('Please enter a description of your project!');
              return false;
            }
          }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: githubLinkInput => {
            if (githubLinkInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    // once data has been collected above, add the project data to the projects array
    .then(projectData => {
        portfolioData.projects.push(projectData);
        // add a condition that will call the promptProject(portfolioData) function when confirmAddProject evaluates to true. In this condition, we're evaluating the user response to whether they wish to add more projects. This response was captured in the answer object, projectData, in the property confirmAddProject. If the user wishes to add more projects, then this condition will evaluate to true and call the promptProject(portfolioData) function.
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        // If the user decides not to add more projects, then the condition will evaluate to false and trigger the following statement. We have to return the portfolioData in the else statement explicitly so that the object is returned. This is a critical step to retrieving the user's answer and building an HTML template    
        } else {
            return portfolioData;
        }
    });
  };
  
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw new Error(err);

    console.log('Page created! Check out index.html in this directory to see it!');
  });
});


// BELOW IS THE REAFCTORED AND CLEANED UP CODE
//const fs = require('fs');

// With this statement, the object in the module.exports assignment will be reassigned to the generatePage variable in the app.js file
//const generatePage = require('./src/page-template.js');

//const pageHTML = generatePage(name, github);

//fs.writeFile('./index.html', pageHTML, err => {
  //if (err) throw new Error(err);

  //console.log('Portfolio complete! Check out index.html to see the output!');
//});


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
