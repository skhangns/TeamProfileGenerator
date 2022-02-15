const inquirer = require("inquirer");
const emailValidator = require("email-validator");
const Manager = require("./lib/Manager.js");
const Intern = require("./lib/Intern.js");
const Engineer = require("./lib/Engineer.js");
const fs = require("fs");

let employees = [];

const Employee = {
  Intern: "Intern",
  Engineer: "Engineer",
  Manager: "Manager",
};

const htmlCard = (e) => {
  let roleInfo;
  let employeeTypeClasses = "";
  let icon = "";
  switch (e.getRole()) {
    case Employee.Manager:
      roleInfo = `<i class="bi bi-building"></i> Office: <strong>${e.officeNumber}</strong>`;
      employeeTypeClasses = "bg-primary bg-gradient text-light";
      icon = "<i class='bi bi-cup-straw'></i>";
      break;
    case Employee.Intern:
      roleInfo = `<i class="bi bi-globe"></i> School: <strong>${e.getSchool()}</strong>`;
      employeeTypeClasses = "bg-success bg-gradient text-light";
      icon = "<i class='bi bi-mortarboard-fill'></i>";
      break;
    case Employee.Engineer:
      roleInfo = `<i class="bi-github" role="img" aria-label="GitHub"></i> Github: ${e.getGithub()}`;
      employeeTypeClasses = "bg-secondary bg-gradient text-light";
      icon = "<i class='bi bi-cup'></i>";
      break;
  }

  return `<div class="col-sm-12 col-lg-6">
          <div class='card'>
            <div class="card-header ${employeeTypeClasses}">
              <h5 class='card-title'>
              ${icon}
              ${e.getName().toUpperCase()}
              </h5>
            </div>
            <div class='card-body'>
              <ul class='list-group'>
                <li class='list-group-item'>
                  Role: <strong>${e.getRole()}</strong>
                </li>
                <li class='list-group-item'>
                  Id: <strong>${e.getId()}</strong>
                </li>            
                <li class='list-group-item'>
                  Email:  
                  <a href="mailto: ${e.getEmail()}">${e.getEmail()}</a>
                </li>
                <li class='list-group-item list-group-item-secondary'>
                  ${roleInfo}
                </li>
              </ul>
            </div>
          </div>
        </div>`;
};

const displayEmployees = (employees) => {
  let employeesHtmlArray = [];
  employees.forEach((e) => {
    employeesHtmlArray.push(htmlCard(e));
  });
  return employeesHtmlArray.join("");
};

const generateHTML = (employees) => {
  const styles = [];
  styles.push(`body{font-size:80%;}`);

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">
      <style>${styles.join("")}</style>
      <title>Team Profile</title>
  </head>
  <body>
    <div class="container p-5">
      <div class="row">
        <h1 class="text-center">Meet the Team</h1>
      </div>
    </div>
    <div class="container">
      <div class="row g-5">
        ${displayEmployees(employees)}
      </div>
    </div>
  </body>
</html>`;
};

// Write to HTML file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    err ? console.error(`We had an error: ${err}`) : console.log("Success!");
  });
}

const validation = {
  required: (response) => {
    return response ? true : console.error("Required answer. Try again...");
  },
  email: (response) => {
    return emailValidator.validate(response)
      ? true
      : console.error(" = invalid email. Try again...");
  },
};

const questions = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the team manager's name?",
        validate: (response) => {
          return validation.required(response);
        },
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager's employee Id?",
        validate: (response) => {
          return validation.required(response);
        },
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email address?",
        validate: (response) => {
          return validation.required(response) && validation.email(response);
        },
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager's office number?",
        validate: (response) => {
          return validation.required(response);
        },
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
      );
      employees.push(manager);
      repeatQuestions();
    });
};

const repeatQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee are you adding?",
        name: "employeeType",
        choices: [new inquirer.Separator(), Employee.Intern, Employee.Engineer],
      },
      {
        type: "input",
        message: "What is the employee name?",
        name: "employeeName",
        validate: (response) => {
          return validation.required(response);
        },
      },
      {
        type: "input",
        message: "What is the employee's Id?",
        name: "employeeId",
        validate: (response) => {
          return validation.required(response);
        },
      },
      {
        type: "input",
        message: "What is the employee's Email?",
        name: "employeeEmail",
        validate: (response) => {
          return validation.required(response) && validation.email(response);
        },
      },
      {
        type: "input",
        message: "What school is the intern from?",
        name: "internSchool",
        when: (answers) => answers.employeeType === Employee.Intern,
        validate: (response) => {
          return validation.required(response);
        },
      },
      {
        type: "input",
        message: "What is the engineer's gitHub username?",
        name: "engineerGitHubUsername",
        when: (answers) => answers.employeeType === Employee.Engineer,
        validate: (response) => {
          return validation.required(response);
        },
      },
      {
        type: "confirm",
        message: "Do you have another employee to add?",
        name: "repeat",
      },
    ])
    .then((answers) => {
      if (answers.employeeType === Employee.Intern) {
        const intern = new Intern(
          answers.employeeName,
          answers.employeeId,
          answers.employeeEmail,
          answers.internSchool
        );
        employees.push(intern);
      }
      if (answers.employeeType === Employee.Engineer) {
        const engineer = new Engineer(
          answers.employeeName,
          answers.employeeId,
          answers.employeeEmail,
          answers.engineerGitHubUsername
        );
        employees.push(engineer);
      }
      if (answers.repeat === true) {
        repeatQuestions();
      } else {
        writeToFile("./dist/index.html", generateHTML(employees));
      }
    });
};

// Initialize application
function init() {
  questions();
}

// Invoke the init function to start the questions
init();