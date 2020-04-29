const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// inquirer questions to ask user for new employee
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
	// ask user if they want to add another employee
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
		// if user wants to add more employees, call promptUser function. if not, return newEmployee
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

			// if the new employee is a manager
			// create new manager object and push it to employees array
			if (teamMember === "Manager") {
				const manager = new Manager(name, id, email, officeNumber);
				employees.push(manager);
			}
			// if the employee is an engineer
			// create new engineer object and push it to employees array
			else if (teamMember === "Engineer") {
				const engineer = new Engineer(name, id, email, github);
				employees.push(engineer);
			}
			// if the employee is an intern
			// create new intern object and push it to employees array
			else if (teamMember === "Intern") {
				const intern = new Intern(name, id, email, school);
				employees.push(intern);
			}
		});

		// render the employees, get html
		const renderEmployee = render(employees);
		// write to path "./output/team.html"
		fs.writeFile(outputPath, renderEmployee, () =>
			console.log("Your team has been assembled.")
		);
	} catch (err) {
		throw new Error(err);
	}
}

// start the app
init();
