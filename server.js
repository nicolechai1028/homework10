var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startEmployeeManager();
    updateServer();
  });

  function updateServer() {
    connection.query("SELECT * from role", function (err, res) {
      allroles = res.map(role => ({ name: role.title, value: role.id }));
    });
  
    connection.query("SELECT * from department", function (err, res) {
      alldepartments = res.map(dept => ({ name: dept.name, value: dept.id }));
    });
  
    connection.query("SELECT * from employee", function (err, res) {
      allemployees = res.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));
    });
  }
  
  function startEmployeeManager() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Exit"
        ]
      })
      .then(function (answer) {
        switch (answer.action) {
          case "View All Employees":
            viewAllEmployees();
            break;
  
          case "View All Departments":
            viewAllDepartments();
            break;
  
          case "View All Roles":
            viewAllRoles();
            break;
  
          case "Add Employee":
            addEmployee();
            break;
  
          case "Add Department":
            addDepartment();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Exit":
            console.log("Application ended.")
            connection.end();
            break;
        }
      });
  }
  
  function viewAllEmployees() {
    console.log("     ")
    var query = "SELECT employee.id, first_name AS firstname, last_name AS lastname, title AS role, name AS department, salary AS salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;";
    connection.query(query, function (err, res) {
      if (err) throw (err);
      console.table(res);
      startEmployeeManager();
    });
  }
  
  function viewAllDepartments() {
    console.log("     ")
    var query = "SELECT id, name AS department FROM department";
    connection.query(query, function (err, res) {
      if (err) throw (err);
      console.table(res);
      startEmployeeManager();
    });
  }
  
  function viewAllRoles() {
    console.log("     ")
    var query = "SELECT r.id, title AS role, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id";
    connection.query(query, function (err, res) {
      if (err) throw (err);
      console.table(res);
      startEmployeeManager();
    });
  }
  
  function addEmployee() {
    updateServer();
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee's role?",
          choices: allroles
        }
      ])
      .then(function (answer) {
        var query = connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role
          },
          function (err, res) {
            if (err) throw err;
            console.table("\nNew Employee Added.\n")
            updateServer();
            startEmployeeManager();
          }
        );
      });
  }
  
  function addDepartment() {
    updateServer();
    inquirer
      .prompt([
        {
          type: "input",
          name: "new_department",
          message: "What department would you like to add?"
        }
      ])
      .then(function (answer) {
        var query = connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.new_department
          },
          function (err, res) {
            if (err) throw err;
            console.table("\nNew Department Added.\n")
            updateServer();
            startEmployeeManager();
          }
        );
      });
  }
  
  function addRole() {
    updateServer();
    inquirer
      .prompt([
        {
          type: "input",
          name: "new_role",
          message: "What role would you like to add?"
        },
        {
          type: "input",
          name: "new_salary",
          message: "What is the salary for this role?"
        },
        {
          name: "department",
          type: "list",
          message: "Which department does this role fall under?",
          choices: alldepartments
        }
      ])
      .then(function (answer) {
        var query = connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.new_role,
            salary: answer.new_salary,
            department_id: answer.department
          },
          function (err, res) {
            if (err) throw err;
            console.table("\nNew Role Added.\n")
            updateServer();
            startEmployeeManager();
          }
        );
      });
  }
  
  function updateEmployeeRole() {
    updateServer();
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Who would you like to update?",
          choices: allemployees
        },
        {
          name: "role",
          type: "list",
          message: "What is the new role of this employee?",
          choices: allroles
        }
      ])
      .then(function (answer) {
        var query = connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.role
            },
            {
              id: answer.employee
            }
          ],
          function (err, res) {
            if (err) throw err;
            console.table("\nThis employee's role has been updated.\n");
            updateServer();
            startEmployeeManager();
          }
        );
      });
  }