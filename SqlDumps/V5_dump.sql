CREATE DATABASE IF NOT EXISTS 72Home_db;
USE 72Home_db;

-- TABELLA ADDRESS
-- centralizza tutte le informazioni sugli indirizzi, evitando di ripeterli nella tabella property
CREATE TABLE address (
    address_id INT AUTO_INCREMENT PRIMARY KEY, -- ID univoco dell'indirizzo
    street VARCHAR(100) NOT NULL,             -- nome della via
    civic_number VARCHAR(10),                 -- numero civico
    city VARCHAR(50) NOT NULL,                -- città
    province VARCHAR(50) NOT NULL,            -- provincia
    postal_code VARCHAR(10) NOT NULL,         -- CAP
    latitude DECIMAL(10,8),                   -- latitudine
    longitude DECIMAL(11,8),                  -- longitudine
    INDEX idx_city (city)                      -- indice per ricerche rapide per città
);

-- TABELLA PROPERTY_TYPE
-- definisce le tipologie di immobile con macro e sub tipologia
CREATE TABLE property_type (
    type_id INT AUTO_INCREMENT PRIMARY KEY,   -- ID univoco della tipologia
    macro_type VARCHAR(50) NOT NULL,          -- categoria principale (es. Residenziale, Commerciale)
    sub_type VARCHAR(50) NOT NULL,            -- sotto-categoria (es. Appartamento, Villa)
    UNIQUE KEY unique_type (macro_type, sub_type) -- garantisce unicità combinazione macro+sub
);

-- TABELLA PROPERTY
-- tabella principale che contiene tutti gli immobili e le loro caratteristiche base
CREATE TABLE property (
    property_id INT AUTO_INCREMENT PRIMARY KEY, -- ID univoco dell'immobile
    address_id INT NOT NULL,                    -- riferimento all'indirizzo
    type_id INT NOT NULL,                       -- riferimento al tipo di immobile
    surface_sqm DECIMAL(10,2) NOT NULL,        -- superficie interna in mq
    commercial_surface_sqm DECIMAL(10,2),      -- superficie commerciale in mq
    rooms INT NOT NULL,                         -- numero di stanze
    bathrooms INT NOT NULL,                     -- numero di bagni
    floor_number INT,                           -- piano dell'immobile
    total_floors INT NOT NULL,                  -- numero totale di piani dell'edificio
    building_year SMALLINT,                     -- anno di costruzione
    has_elevator BOOLEAN DEFAULT FALSE,         -- presenza ascensore
    heating_type VARCHAR(50) DEFAULT 'Non indicato', -- tipo di riscaldamento
    exposure VARCHAR(50),                        -- esposizione dell'immobile
    view_type VARCHAR(50) DEFAULT 'Non specificata', -- tipo di vista
    energy_class VARCHAR(10) DEFAULT 'Non specificata', -- classe energetica
    property_condition VARCHAR(50) DEFAULT 'Altro',    -- stato dell'immobile
    occupancy_status VARCHAR(50) DEFAULT 'Libero',     -- occupazione attuale
    position_type VARCHAR(50) DEFAULT 'Interno',       -- posizione interna/angolare
    FOREIGN KEY (address_id) REFERENCES address(address_id) ON UPDATE CASCADE ON DELETE CASCADE, -- eliminando l'indirizzo, eliminare anche property
    FOREIGN KEY (type_id) REFERENCES property_type(type_id) ON UPDATE CASCADE ON DELETE RESTRICT, -- non permettere eliminazione tipo se usato
    INDEX idx_city_type (address_id, type_id) -- indice combinato per ricerche rapide
);

-- TABELLA PROPERTY_FEATURES
-- contiene le caratteristiche opzionali degli immobili (garage, giardino, piscina, ecc.)
CREATE TABLE property_features (
    feature_id INT AUTO_INCREMENT PRIMARY KEY, -- ID univoco della feature
    property_id INT NOT NULL,                  -- riferimento all'immobile
    has_garage BOOLEAN DEFAULT FALSE,          -- presenza garage
    garage_size_sqm DECIMAL(6,2),             -- dimensione garage
    has_garden BOOLEAN DEFAULT FALSE,          -- presenza giardino
    garden_size_sqm DECIMAL(8,2),             -- dimensione giardino
    has_terrace BOOLEAN DEFAULT FALSE,         -- presenza terrazza
    terrace_size_sqm DECIMAL(6,2),            -- dimensione terrazza
    has_balcony BOOLEAN DEFAULT FALSE,         -- presenza balcone
    balcony_size_sqm DECIMAL(6,2),            -- dimensione balcone
    has_swimming_pool BOOLEAN DEFAULT FALSE,   -- presenza piscina
    has_basement BOOLEAN DEFAULT FALSE,        -- presenza cantina
    has_attic BOOLEAN DEFAULT FALSE,           -- presenza soffitta
    has_air_conditioning BOOLEAN DEFAULT FALSE, -- aria condizionata
    has_alarm BOOLEAN DEFAULT FALSE,           -- allarme
    has_fireplace BOOLEAN DEFAULT FALSE,       -- camino
    has_solar_panels BOOLEAN DEFAULT FALSE,    -- pannelli solari
    has_concierge BOOLEAN DEFAULT FALSE,       -- portineria
    notes TEXT,                                -- note aggiuntive
    FOREIGN KEY (property_id) REFERENCES property(property_id) ON UPDATE CASCADE ON DELETE CASCADE, -- eliminando immobile, eliminare anche features
    UNIQUE KEY (property_id)                   -- un set di feature per immobile
);

-- TABELLA ADMINISTRATOR
-- gestisce gli utenti interni del sistema (admin, valutatori, supervisori)
CREATE TABLE administrator (
    administrator_id INT AUTO_INCREMENT PRIMARY KEY, -- ID univoco dell'amministratore
    first_name VARCHAR(50) NOT NULL,                 -- nome
    last_name VARCHAR(50) NOT NULL,                  -- cognome
    email VARCHAR(100) NOT NULL UNIQUE,             -- email unica
    phone_number VARCHAR(20),                        -- numero di telefono
    username VARCHAR(100) NOT NULL UNIQUE,          -- username unico
    password_hash VARCHAR(255) NOT NULL,            -- hash della password
    role VARCHAR(50) DEFAULT 'Valutatore',          -- ruolo
    is_active BOOLEAN DEFAULT TRUE,                 -- attivo o disabilitato
    INDEX idx_username (username)                    -- indice per ricerche rapide
);

-- TABELLA USERS
-- rappresenta lead o clienti interessati agli immobili
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,  -- ID univoco dell'utente
    first_name VARCHAR(50) NOT NULL,        -- nome
    last_name VARCHAR(50) NOT NULL,         -- cognome
    email VARCHAR(80) NOT NULL,             -- email
    phone_number VARCHAR(20) NOT NULL,     -- numero di telefono
    lead_status VARCHAR(50) DEFAULT 'Nuovo', -- stato del lead
    lead_score INT DEFAULT 0,               -- punteggio del lead
    source VARCHAR(50) DEFAULT 'Altro',     -- fonte
    INDEX idx_email (email),                -- indice per ricerche rapide
    INDEX idx_phone (phone_number),
    INDEX idx_lead_status (lead_status)
);

-- TABELLA VALUATION
-- registra le valutazioni degli immobili fatte per un utente
CREATE TABLE valuation (
    valuation_id INT AUTO_INCREMENT PRIMARY KEY, -- ID univoco della valutazione
    property_id INT NOT NULL,                    -- riferimento all'immobile
    user_id INT NOT NULL,                        -- riferimento all'utente
    status VARCHAR(50) DEFAULT 'In attesa',      -- stato della valutazione
    assigned_to INT,                              -- riferimento all'amministratore
    estimated_value_min DECIMAL(15,2),          -- stima minima
    estimated_value_max DECIMAL(15,2),          -- stima massima
    estimated_value DECIMAL(15,2),              -- valore stimato
    valuation_method VARCHAR(50) DEFAULT 'Automatica', -- metodo di valutazione
    confidence_score DECIMAL(3,2),              -- punteggio di affidabilità
    professional_review TEXT,                    -- revisione professionale
    internal_notes TEXT,                         -- note interne
    deadline TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- scadenza valutazione
    FOREIGN KEY (property_id) REFERENCES property(property_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES administrator(administrator_id) ON UPDATE CASCADE ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_assigned (assigned_to),
    INDEX idx_deadline (deadline)
);

-- TABELLA EXCLUSIVITY_CONTRACT
-- registra i contratti di esclusiva sugli immobili tra utente e agenzia
CREATE TABLE exclusivity_contract (
    contract_id INT AUTO_INCREMENT PRIMARY KEY,   -- ID univoco del contratto
    valuation_id INT NOT NULL,                    -- riferimento alla valutazione
    user_id INT NOT NULL,                         -- riferimento all'utente
    property_id INT NOT NULL,                     -- riferimento all'immobile
    contract_status VARCHAR(50) DEFAULT 'Bozza',  -- stato del contratto
    start_date DATE,                              -- data inizio
    end_date DATE,                                -- data fine
    duration_months INT DEFAULT 6,                -- durata in mesi
    commission_percentage DECIMAL(4,2) DEFAULT 3.50, -- percentuale commissione
    agreed_sale_price DECIMAL(15,2),             -- prezzo concordato
    contract_pdf_path VARCHAR(500),              -- percorso PDF contratto
    signed_contract_path VARCHAR(500),           -- percorso contratto firmato
    terms_and_conditions TEXT,                   -- termini e condizioni
    FOREIGN KEY (valuation_id) REFERENCES valuation(valuation_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES property(property_id) ON UPDATE CASCADE ON DELETE CASCADE,
    INDEX idx_status (contract_status),
    INDEX idx_dates (start_date, end_date)
);

-- TABELLA EVALUATION_LOG
-- registra le azioni fatte sulle valutazioni

-- CREATE TABLE evaluation_log (
--    log_id INT AUTO_INCREMENT PRIMARY KEY,   -- ID univoco del log
--    valuation_id INT NOT NULL,               -- riferimento alla valutazione
--    administrator_id INT,                    -- riferimento all'amministratore
--    action_type VARCHAR(50) NOT NULL,        -- tipo di azione
--   action_description TEXT,                 -- descrizione dell'azione
--    old_value VARCHAR(255),                  -- valore precedente
--    new_value VARCHAR(255),                  -- nuovo valore
--    FOREIGN KEY (valuation_id) REFERENCES valuation(valuation_id) ON UPDATE CASCADE ON DELETE CASCADE,
--    FOREIGN KEY (administrator_id) REFERENCES administrator(administrator_id) ON UPDATE CASCADE ON DELETE SET NULL,
--    INDEX idx_valuation (valuation_id)
-- );

-- INSERIMENTO PROPERTY_TYPE DI DEFAULT
INSERT INTO property_type (macro_type, sub_type) VALUES
('Residenziale', 'Appartamento'),
('Residenziale', 'Villa'),
('Residenziale', 'Attico'),
('Residenziale', 'Mansarda'),
('Residenziale', 'Loft'),
('Commerciale', 'Negozio'),
('Commerciale', 'Ufficio'),
('Commerciale', 'Capannone'),
('Commerciale', 'Locale commerciale'),
('Terreno', 'Edificabile'),
('Terreno', 'Agricolo');

-- INSERIMENTO ADMINISTRATOR DI DEFAULT
INSERT INTO administrator (first_name, last_name, email, username, password_hash, role) VALUES
('Admin', 'Sistema', 'admin@valutatore.it', 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIcwlzBdaDXJSJ8xbcw5wXNgR5y0XKbu', 'Admin');
