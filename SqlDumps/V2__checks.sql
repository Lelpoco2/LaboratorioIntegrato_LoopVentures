-- select * (ecc.. )

alter table houses
add id_customers int,
add FOREIGN KEY (id_customers) REFERENCES customers(id);
-- foreign key houses => customers


alter table contracts
add id_houses int,
add FOREIGN KEY (id_houses) REFERENCES houses(id);
-- foreign key contracts => houses


alter table house_photo
add id_houses int,
add FOREIGN KEY (id_houses) REFERENCES houses(id);
-- foreign key house_photo => houses


INSERT INTO users (email, pw, username) VALUES
('alice@example.com', 'hash_pw1', 'alice01'),
('bob@example.com', 'hash_pw2', 'bobby'),
('carol@example.com', 'hash_pw3', 'carol88'),
('daniel@example.com', 'hash_pw4', 'dani'),
('eve@example.com', 'hash_pw5', 'eve9'),
('frank@example.com', 'hash_pw6', 'frankie'),
('grace@example.com', 'hash_pw7', 'graceh'),
('henry@example.com', 'hash_pw8', 'henry12'),
('irene@example.com', 'hash_pw9', 'irenex'),
('jack@example.com', 'hash_pw10', 'jackk'),
('kate@example.com', 'hash_pw11', 'katie'),
('liam@example.com', 'hash_pw12', 'liamc'),
('mia@example.com', 'hash_pw13', 'miamia'),
('noah@example.com', 'hash_pw14', 'noahb'),
('olivia@example.com', 'hash_pw15', 'oliviag'),
('paul@example.com', 'hash_pw16', 'pauly'),
('quinn@example.com', 'hash_pw17', 'quinny'),
('rachel@example.com', 'hash_pw18', 'rachx'),
('sam@example.com', 'hash_pw19', 'samuelz'),
('tina@example.com', 'hash_pw20', 'tinat');


INSERT INTO customers (email, phone, created_at) VALUES
('customer1@mail.com', '3456789012', NOW()),
('customer2@mail.com', '3356789012', NOW()),
('customer3@mail.com', '3256789012', NOW()),
('customer4@mail.com', '3156789012', NOW()),
('customer5@mail.com', '3056789012', NOW()),
('customer6@mail.com', '3756789012', NOW()),
('customer7@mail.com', '3856789012', NOW()),
('customer8@mail.com', '3956789012', NOW()),
('customer9@mail.com', '3556789012', NOW()),
('customer10@mail.com', '3656789012', NOW()),
('customer11@mail.com', '3123456789', NOW()),
('customer12@mail.com', '3223456789', NOW()),
('customer13@mail.com', '3323456789', NOW()),
('customer14@mail.com', '3423456789', NOW()),
('customer15@mail.com', '3523456789', NOW()),
('customer16@mail.com', '3623456789', NOW()),
('customer17@mail.com', '3723456789', NOW()),
('customer18@mail.com', '3823456789', NOW()),
('customer19@mail.com', '3923456789', NOW()),
('customer20@mail.com', '3023456789', NOW());


INSERT INTO houses (address, city, province, postal_code, property_type, surface_mq, rooms, bathrooms, floor, year_built, house_condition, estimated_value, evaluation_date, id_customers)
VALUES
('Via Roma 10', 'Milano', 'MI', '20100', 'Appartamento', 80, 3, 1, 2, 2005, 'Buono', 250000, NOW(), 1),
('Via Torino 22', 'Milano', 'MI', '20121', 'Attico', 120, 4, 2, 5, 2010, 'Ottimo', 480000, NOW(), 2),
('Corso Italia 5', 'Roma', 'RM', '00100', 'Villa', 300, 8, 3, 0, 1998, 'Ristrutturato', 750000, NOW(), 3),
('Via Verdi 7', 'Firenze', 'FI', '50100', 'Appartamento', 90, 4, 2, 1, 2001, 'Buono', 320000, NOW(), 4),
('Via Dante 12', 'Bologna', 'BO', '40100', 'Monolocale', 45, 1, 1, 3, 2015, 'Nuovo', 180000, NOW(), 5),
('Via Po 9', 'Torino', 'TO', '10100', 'Appartamento', 70, 3, 1, 2, 2000, 'Ottimo', 240000, NOW(), 6),
('Viale Venezia 50', 'Verona', 'VR', '37100', 'Casa Indipendente', 150, 6, 2, 0, 1995, 'Buono', 400000, NOW(), 7),
('Via Napoli 20', 'Napoli', 'NA', '80100', 'Attico', 130, 5, 2, 6, 2012, 'Ottimo', 500000, NOW(), 8),
('Piazza Garibaldi 1', 'Parma', 'PR', '43100', 'Appartamento', 85, 3, 1, 3, 2008, 'Buono', 260000, NOW(), 9),
('Via Manzoni 33', 'Genova', 'GE', '16100', 'Casa a schiera', 110, 5, 2, 1, 2004, 'Ottimo', 370000, NOW(), 10),
('Via Mazzini 15', 'Padova', 'PD', '35100', 'Appartamento', 75, 3, 1, 2, 2003, 'Buono', 220000, NOW(), 11),
('Via Leopardi 14', 'Trieste', 'TS', '34100', 'Appartamento', 65, 2, 1, 1, 2011, 'Ottimo', 210000, NOW(), 12),
('Via Emilia 100', 'Modena', 'MO', '41100', 'Villetta', 160, 6, 3, 0, 1997, 'Buono', 390000, NOW(), 13),
('Via Palermo 45', 'Palermo', 'PA', '90100', 'Appartamento', 85, 3, 1, 4, 2009, 'Buono', 230000, NOW(), 14),
('Via Bari 11', 'Bari', 'BA', '70100', 'Appartamento', 90, 4, 2, 2, 2002, 'Buono', 240000, NOW(), 15),
('Via Salaria 7', 'Rieti', 'RI', '02100', 'Casa Indipendente', 130, 5, 2, 0, 1999, 'Ristrutturato', 310000, NOW(), 16),
('Via Lodi 9', 'Lodi', 'LO', '26900', 'Appartamento', 70, 3, 1, 1, 2007, 'Ottimo', 200000, NOW(), 17),
('Via Como 14', 'Como', 'CO', '22100', 'Villa', 250, 7, 3, 0, 1990, 'Buono', 680000, NOW(), 18),
('Via Udine 4', 'Udine', 'UD', '33100', 'Appartamento', 80, 3, 1, 2, 2013, 'Ottimo', 230000, NOW(), 19),
('Via Ferrara 8', 'Ferrara', 'FE', '44100', 'Villetta', 140, 5, 2, 0, 2006, 'Buono', 360000, NOW(), 20);

INSERT INTO contracts (contract_type, start_date, end_date, commission_percentage, contract_status, signed_at, id_houses)
VALUES
('Vendita', '2024-01-10', '2024-12-10', 3.5, 'attivo', NOW(), 1),
('Affitto', '2023-05-01', '2024-05-01', 2.0, 'terminato', NOW(), 2),
('Vendita', '2024-03-15', '2025-03-15', 3.0, 'attivo', NOW(), 3),
('Affitto', '2023-06-01', '2023-12-01', 1.5, 'scaduto', NOW(), 4),
('Vendita', '2024-04-10', '2025-04-10', 4.0, 'bozza', NOW(), 5),
('Affitto', '2023-07-01', '2024-07-01', 2.5, 'rinnovato', NOW(), 6),
('Vendita', '2022-01-01', '2023-01-01', 3.2, 'terminato', NOW(), 7),
('Affitto', '2023-08-15', '2024-08-15', 1.8, 'attivo', NOW(), 8),
('Vendita', '2024-02-01', '2025-02-01', 3.7, 'attivo', NOW(), 9),
('Vendita', '2024-01-01', '2024-12-31', 3.5, 'attivo', NOW(), 10),
('Affitto', '2023-01-01', '2023-12-31', 2.0, 'terminato', NOW(), 11),
('Vendita', '2024-06-01', '2025-06-01', 4.2, 'bozza', NOW(), 12),
('Vendita', '2024-05-01', '2025-05-01', 3.1, 'attesa firma', NOW(), 13),
('Affitto', '2023-09-01', '2024-09-01', 2.3, 'attivo', NOW(), 14),
('Vendita', '2022-10-01', '2023-10-01', 3.9, 'terminato', NOW(), 15),
('Affitto', '2023-04-01', '2024-04-01', 2.2, 'rinnovato', NOW(), 16),
('Vendita', '2024-07-01', '2025-07-01', 3.8, 'attivo', NOW(), 17),
('Affitto', '2023-11-01', '2024-11-01', 2.5, 'attivo', NOW(), 18),
('Vendita', '2024-08-01', '2025-08-01', 3.3, 'bozza', NOW(), 19),
('Affitto', '2023-02-01', '2024-02-01', 2.0, 'scaduto', NOW(), 20);


INSERT INTO house_photo (file_path, file_name, is_primary, upload_oder, id_houses) VALUES
('/img/houses/1/front.jpg', 'front.jpg', TRUE, 1, 1),
('/img/houses/1/interior1.jpg', 'interior1.jpg', FALSE, 2, 1),
('/img/houses/2/front.jpg', 'front.jpg', TRUE, 1, 2),
('/img/houses/3/garden.jpg', 'garden.jpg', TRUE, 1, 3),
('/img/houses/4/salon.jpg', 'salon.jpg', TRUE, 1, 4),
('/img/houses/5/kitchen.jpg', 'kitchen.jpg', TRUE, 1, 5),
('/img/houses/6/front.jpg', 'front.jpg', TRUE, 1, 6),
('/img/houses/7/facade.jpg', 'facade.jpg', TRUE, 1, 7),
('/img/houses/8/terrace.jpg', 'terrace.jpg', TRUE, 1, 8),
('/img/houses/9/interior.jpg', 'interior.jpg', TRUE, 1, 9),
('/img/houses/10/garden.jpg', 'garden.jpg', TRUE, 1, 10),
('/img/houses/11/front.jpg', 'front.jpg', TRUE, 1, 11),
('/img/houses/12/bedroom.jpg', 'bedroom.jpg', TRUE, 1, 12),
('/img/houses/13/pool.jpg', 'pool.jpg', TRUE, 1, 13),
('/img/houses/14/front.jpg', 'front.jpg', TRUE, 1, 14),
('/img/houses/15/kitchen.jpg', 'kitchen.jpg', TRUE, 1, 15),
('/img/houses/16/garden.jpg', 'garden.jpg', TRUE, 1, 16),
('/img/houses/17/terrace.jpg', 'terrace.jpg', TRUE, 1, 17),
('/img/houses/18/interior.jpg', 'interior.jpg', TRUE, 1, 18),
('/img/houses/19/front.jpg', 'front.jpg', TRUE, 1, 19);


INSERT INTO form_submission (session_id, currnent_step, form_data, completed, abandoned_at) VALUES
('sess_001', 3, '{"field1":"value1"}', FALSE, NOW()),
('sess_002', 5, '{"field2":"value2"}', TRUE, NULL),
('sess_003', 2, '{"field3":"value3"}', FALSE, NOW()),
('sess_004', 6, '{"field4":"value4"}', TRUE, NULL),
('sess_005', 1, '{"field5":"value5"}', FALSE, NOW()),
('sess_006', 4, '{"field6":"value6"}', TRUE, NULL),
('sess_007', 5, '{"field7":"value7"}', FALSE, NOW()),
('sess_008', 6, '{"field8":"value8"}', TRUE, NULL),
('sess_009', 3, '{"field9":"value9"}', FALSE, NOW()),
('sess_010', 2, '{"field10":"value10"}', FALSE, NOW()),
('sess_011', 5, '{"field11":"value11"}', TRUE, NULL),
('sess_012', 4, '{"field12":"value12"}', TRUE, NULL),
('sess_013', 3, '{"field13":"value13"}', FALSE, NOW()),
('sess_014', 6, '{"field14":"value14"}', TRUE, NULL),
('sess_015', 1, '{"field15":"value15"}', FALSE, NOW()),
('sess_016', 5, '{"field16":"value16"}', TRUE, NULL),
('sess_017', 4, '{"field17":"value17"}', TRUE, NULL),
('sess_018', 2, '{"field18":"value18"}', FALSE, NOW()),
('sess_019', 6, '{"field19":"value19"}', TRUE, NULL),
('sess_020', 3, '{"field20":"value20"}', FALSE, NOW());


select * from users;

select * from houses;

select * from contracts;

select * from house_photo;

select * from form_submission;