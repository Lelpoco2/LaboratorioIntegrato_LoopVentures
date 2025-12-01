<<<<<<< HEAD
create table users (
    id int auto_increment primary key,
    username varchar(50) not null unique,
    password varchar(100) not null,
    email varchar(100) not null unique,
    created_at timestamp default current_timestamp not null
);

create table roles(
    id binary(16) primary key,
    role varchar(50) not null unique
);

create table user_roles (
    user_id int not null,
    role_id binary(16) not null,
    primary key (user_id, role_id),
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (role_id) references roles(id) on delete cascade
);



-- Inserisci un ruolo ADMINISTRATOR e salva l'UUID binario in una variabile
set @administrator_role_id = UNHEX(REPLACE(UUID(),'-',''));
insert into roles (id, role) values (@administrator_role_id, 'ADMINISTRATOR');

-- Inserisci un utente di esempio e salva l'id in una variabile
insert into users (username, password, email) values ('admin', 'adminpassword', 'admin@example.com');
set @admin_user_id = LAST_INSERT_ID();

-- Associa l'utente al ruolo ADMINISTRATOR
insert into user_roles (user_id, role_id) values (@admin_user_id, @administrator_role_id);


=======
-- create table users (
--     id serial primary key,
--     username varchar(50) not null unique,
--     password varchar(100) not null,
--     email varchar(100) not null unique,
--     created_at timestamp default current_timestamp
-- );
>>>>>>> 9b2ecc9a169f402e8936e2bb52538a4f6d91cc0c
