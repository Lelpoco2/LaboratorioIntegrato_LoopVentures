CREATE DATABASE ImmobiliarisDB;
USE ImmobiliarisDB;

-- TABELLA PROPERTIES_CONDITION
CREATE TABLE properties_condition (
    condition_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    condition_name VARCHAR(20) NOT NULL
);

-- TABELLA PROPERTIES
CREATE TABLE Properties (
    property_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    address VARCHAR(80) NOT NULL,
    city VARCHAR(50) NOT NULL,
    province VARCHAR(2) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    surface_sqm DECIMAL(10,2) NOT NULL,
    rooms INT NOT NULL,
    bathrooms INT NOT NULL,
    floors INT NOT NULL,
    property_conditions INT NOT NULL, -- eventualmente si utilizzerà varchar() con check
    energetic_class INT NOT NULL, -- eventualmente si utilizzerà varchar() con check
    CONSTRAINT fk_properties_condition
        FOREIGN KEY (property_conditions)
        REFERENCES properties_condition(condition_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- TABELLA USERS
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    property_id INT NOT NULL,
    privacy_accepted BOOLEAN DEFAULT FALSE,
    marketing_accepted BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP,
    created_at TIMESTAMP,
    CONSTRAINT fk_users_properties
        FOREIGN KEY (property_id)
        REFERENCES Properties(property_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- TABELLA ADMINISTRATORS
CREATE TABLE administrators (
    administrator_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number varchar(20) not null,
    username varchar(100) not null,
    a_password varchar(80) not null
);

