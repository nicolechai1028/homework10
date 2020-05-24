USE employee_trackerDB;

--Departments--
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Marketing");

--Roles--
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Director", 150000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 90000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Financial Officer", 250000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("VP of Finance", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Software Engineer", 200000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Marketing Officer", 250000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 100000, 4);

--Employees
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ashley", "Rodriquez", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 4, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Malia", "Brown", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 6, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Nicole", "Chai", 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 8, 7);

