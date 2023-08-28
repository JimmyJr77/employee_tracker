-- Dictating use of the management_db database
USE management_db;

-- Insert sample data into the department table
INSERT INTO department (name)
VALUES
  ('Physics'),
  ('Literature'),
  ('History'),
  ('Mathematics'),
  ('Chemistry'),
  ('Art'),
  ('Biology'),
  ('Philosophy');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id)
VALUES
  ('Physicist', 100000, 1),
  ('Writer', 80000, 2),
  ('Historian', 75000, 3),
  ('Mathematician', 90000, 4),
  ('Chemist', 85000, 5),
  ('Artist', 70000, 6),
  ('Biologist', 95000, 7),
  ('Philosopher', 85000, 8);

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Albert', 'Einstein', 1, NULL),
  ('William', 'Shakespeare', 2, 1),
  ('Leonardo', 'da Vinci', 3, 1),
  ('Ada', 'Lovelace', 4, 2),
  ('Isaac', 'Newton', 1, NULL),
  ('Jane', 'Austen', 2, 5),
  ('Napoleon', 'Bonaparte', 3, 5),
  ('Archimedes', 'of Syracuse', 4, 6),
  ('Marie', 'Curie', 1, NULL),
  ('Pablo', 'Picasso', 6, 9),
  ('Charles', 'Darwin', 7, 9),
  ('Socrates', 'the', 8, 10);
