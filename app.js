const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [
	{
		type: "list",
		message: "Which type of team member would you like to add?",
		choices: [
			"Manager",
			"Engineer",
			"Intern",
			"I don't want to add any more team members.",
		],
		name: "teamMember",
	},
	// Manager questions
	{
		type: "input",
		message: "What is the manager's name?",
		name: "name",
		when: function (answers) {
			return answers.teamMember === "Manager";
		},
	},
	{
		type: "input",
		message: "What is the manager's id?",
		name: "id",
		when: function (answers) {
			return answers.teamMember === "Manager";
		},
	},
	{
		type: "input",
		message: "What is the manager's email?",
		name: "email",
		when: function (answers) {
			return answers.teamMember === "Manager";
		},
	},
	{
		type: "input",
		message: "What is the manager's office number?",
		name: "officeNumber",
		when: function (answers) {
			return answers.teamMember === "Manager";
		},
	},
	// Engineer questions
	{
		type: "input",
		message: "What is the engineer's name?",
		name: "name",
		when: function (answers) {
			return answers.teamMember === "Engineer";
		},
	},
	{
		type: "input",
		message: "What is the engineer's id?",
		name: "id",
		when: function (answers) {
			return answers.teamMember === "Engineer";
		},
	},
	{
		type: "input",
		message: "What is the engineer's email?",
		name: "email",
		when: function (answers) {
			return answers.teamMember === "Engineer";
		},
	},
	{
		type: "input",
		message: "What is the engineer's Github username?",
		name: "github",
		when: function (answers) {
			return answers.teamMember === "Engineer";
		},
	},
	// intern questions
	{
		type: "input",
		message: "What is the intern's name?",
		name: "name",
		when: function (answers) {
			return answers.teamMember === "Intern";
		},
	},
	{
		type: "input",
		message: "What is the intern's id?",
		name: "id",
		when: function (answers) {
			return answers.teamMember === "Intern";
		},
	},
	{
		type: "input",
		message: "What is the intern's email?",
		name: "email",
		when: function (answers) {
			return answers.teamMember === "Intern";
		},
	},
	{
		type: "input",
		message: "What is the intern's school?",
		name: "school",
		when: function (answers) {
			return answers.teamMember === "Intern";
		},
	},
	{
		type: "confirm",
		name: "again",
		message: "Would you like to add another employee?",
		default: true,
	},
];

// ask user for which type of team member
async function promptUser(employeesInput = []) {
	try {
		const { again, ...answers } = await inquirer.prompt(questions);
		// newEmployee that takes in the employeesInput array called in the function and the answers from the prompt
		const newEmployee = [...employeesInput, answers];
		// if user wants to add more employees, call promptUser  function. if not, return newEmployee
		return again ? promptUser(newEmployee) : newEmployee;
	} catch (err) {
		throw err;
	}
}

async function init() {
	try {
		// array to store employees
		const employees = [];
		// get data from user and store it
		console.log("Answer the following questions to build your team.");
		const employeesData = await promptUser();

		// go through the user response data and add an employee based on role specified by user
		employeesData.map((employee) => {
			const {
				name,
				id,
				email,
				teamMember,
				officeNumber,
				github,
				school,
			} = employee;

			if (teamMember === "Manager") {
				// create new manager object and push it to employees array
				const newManager = new Manager(name, id, email, officeNumber);
				employees.push(newManager);
			} else if (teamMember === "Engineer") {
				// create new engineer object and push it to employees array
				const newEngineer = new Engineer(name, id, email, github);
				employees.push(newEngineer);
			} else if (teamMember === "Intern") {
				// create new intern object and push it to employees array
				const newIntern = new Intern(name, id, email, school);
				employees.push(newIntern);
			}
		});

		// render the employees, get html
		const renderEmployee = render(employees);
		// write to path "./output/team.html"
		fs.writeFile(outputPath, renderEmployee, () => console.log("SUCCESS!"));
	} catch (err) {
		throw new Error(err);
	}
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// render();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
