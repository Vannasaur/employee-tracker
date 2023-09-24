-- holds all databases we want to create --

-- drop database if exists --
DROP DATABASE IF EXISTS blips_and_chitz_db;
-- create database --
CREATE DATABASE blips_and_chitz_db;
-- use database --
USE blips_and_chitz_db;

-- create department table --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
-- create role table --
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);
-- create employee table --
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);