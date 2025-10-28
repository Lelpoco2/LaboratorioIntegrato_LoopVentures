-- creazione database immobiliarisdb;
create database immobiliarisdb;

-- creazione tabelle db

-- Tabella users (utenti del sistema: agenti, valutatori, admin)
CREATE TABLE users (
    id int auto_increment PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    pw varchar(255),
    username varchar(255)
);

-- tabella owners (propietari delle case)

CREATE TABLE owners(
id int not null auto_increment PRIMARY KEY,
first_name varchar(100)not null,
last_name varchar (100) not null,
email varchar(200) not null,
phone varchar(20) not null,
cod_fiscale char(18) not null,
created_at timestamp, -- eventualmente lo si cambia in varchar x problemi di compatibilità
updated_at timestamp
);

-- tabella Houses
CREATE TABLE houses(
id int not null auto_increment primary key,
address varchar(255) not null,






);