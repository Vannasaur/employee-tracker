-- holds values we want to insert into tables --

-- insert values for departments --
INSERT INTO department (name)
VALUES 
    ("Management"),
    ("Arcade Games"),
    ("Snack Bar"),
    ("Prizes"),
    ("Sanitation");
-- insert values for roles --
INSERT INTO role (title, salary, department_id)
VALUES
    ("Manager", 100000, 1),
    ("Shift Lead", 70000, 2),
    ("Concessions", 30000, 3),
    ("Cashier", 30000, 4),
    ("Janitor", 50000, 5);
-- insert values for employees --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Jackie", "Gazorpian", 1, NULL),
    ("Fred", "Cromulon", 2, 1),
    ("Squanchy", "Squanch", 3, 1),
    ("Chad", "Cronenberg", 4, 1),
    ("Matt", "Meeseeks", 5, 1);
