CREATE TABLE if not exists users (
    id int auto_increment not null PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    pw varchar(255),
    username varchar(255)
);
-- drop table users;

-- tabella owners (propietari delle case)

CREATE TABLE if not exists customers(
id int not null auto_increment PRIMARY KEY,
nome varchar(100) not null,
cognome varchar(100) not null,      -- aggiunto come e cognome come dati obligatori
email varchar(200) not null,
phone varchar(20),
created_at timestamp -- eventualmente lo si cambia in varchar x problemi di compatibilità
);

-- tabella Houses
CREATE TABLE if not exists houses(
id int not null auto_increment primary key,
address varchar(255) not null,
city varchar(100) not null,
province varchar(2)not null,
postal_code varchar(5)not null,
property_type varchar(50)not null,
surface_mq decimal not null,
rooms int not null,
bathrooms int not null,
floor int not null,
year_built int not null,
house_condition varchar(200) not null,
estimated_value decimal not null,
evaluation_date timestamp -- eventualmente da cambiare in varchar se va in conflitto con il codice
);

-- tabella contracts
CREATE TABLE if not exists contracts(
id int auto_increment primary key not null,
contract_type varchar(50),
start_date date,
end_date date,
commission_percentage decimal,
contract_status enum("bozza", "attesa firma", "attivo", "scaduto", "terminato", "rinnovato"),
signed_at timestamp -- \\
);

-- tabella House_photo

CREATE TABLE if not exists house_photo(
id int primary key auto_increment not null,
file_path varchar(600) not null,
file_name varchar(255),
is_primary bool,
upload_oder int
);

-- tabella leads
-- CREATE TABLE leads(
-- id int auto_increment not null,
-- first_name varchar(30) not null,
-- last_name varchar(30) not null,
-- email varchar(100) not null,
-- phone varchar(20) not null
-- );

-- tabella form submission

CREATE TABLE if not exists form_submission(
id int auto_increment not null,
session_id varchar(200) not null,
currnent_step int(30) not null,
form_data json not null,
completed bool not null,
abandoned_at timestamp
);