# Estimora - Real Estate Acquisition Platform

## Indice
1. [Project Overview](#1-project-overview)
   - [Come funziona il sito](#come-funziona-il-sito-panoramica)
2. [Componenti del Team](#2-componenti-del-team)
3. [Tech Stack e Dipendenze](#3-tech-stack-e-dipendenze)
   - [3.1 Frontend](#31-frontend)
   - [3.2 Backend](#32-backend)
   - [3.3 Infrastructure](#33-infrastructure)
4. [Installazione e Getting Started](#4-installazione-e-getting-started)
   - [4.1 Prerequisiti](#41-prerequisiti)
   - [4.2 Ambienti Disponibili](#42-ambienti-disponibili)
5. [Referenze per l'API](#5-referenze-per-lapi)
6. [Struttura del Progetto](#6-struttura-del-progetto)
7. [Routing](#7-routing)
   - [7.1 Public Routes](#71-public-routes)
   - [7.2 Protected Routes (Dashboard)](#72-protected-routes-dashboard)
8. [Styling](#8-styling)
   - [8.1 Design System](#81-design-system)
   - [8.2 Responsive Design](#82-responsive-design)
9. [Validazione Dati](#9-validazione-dati)
   - [9.1 Validazione Client-Side (Evaluator) – Sintesi](#91-validazione-client-side-evaluator-–-sintesi)
11. [Sicurezza e Autenticazione](#11-sicurezza-e-autenticazione)
12. [Link Utili](#12-link-utili)

---

## 1. Project Overview

**Estimora** (precedentemente 72Home) è una piattaforma web innovativa per l'acquisizione di immobili in esclusiva, sviluppata dal team **Loop Ventures** per il corso di Laboratorio Integrato. Il progetto mira a digitalizzare il processo di valutazione e acquisizione immobiliare, offrendo un'esperienza utente moderna e intuitiva.

### Caratteristiche Principali
- **Valutazione automatica immobili**: Sistema guidato multi-step per la valutazione rapida
- **Dashboard amministrativa**: Gestione completa di immobili, utenti e agenti
- **Autenticazione JWT**: Sistema sicuro di login con token-based authentication
- **Design responsive**: Ottimizzato per desktop, tablet e mobile

### Come funziona il sito (Panoramica)
- **Homepage**: introduce il servizio con una hero chiara, CTA per avviare la valutazione, sezioni informative (perché noi, passi, agenti, newsletter). Tutte le immagini non critiche sono ottimizzate e caricate in lazy per migliorare la performance.
- **Evaluator (Valutazione)**: un flusso multi-step guidato che raccoglie i dati dell’immobile e dei contatti. Il flusso è dinamico: alcune domande compaiono o scompaiono in base alle scelte dell’utente (es. ascensore visibile solo se piano > 1). La validazione lato client assicura dati coerenti prima dell’invio.
- **Dashboard (protetta)**: area amministrativa per la gestione di utenti, agenti e immobili. L’accesso richiede autenticazione JWT; le pagine della dashboard sono caricate in lazy per ridurre il bundle iniziale.
- **Login**: autenticazione con email e password; al successo viene memorizzato il token JWT per proteggere le route.
- **Error Page (404)**: intercetta route non valide e offre opzioni rapide per tornare alla home o avviare una valutazione.

### Obiettivi del Progetto
- Portale web per acquisizione immobili in esclusiva (modello Gromia.com)
- Campagna di lead generation e digital marketing
- Definizione della USP (Unique Selling Proposition)
- Piano di comunicazione social e strategia di acquisizione clienti

---

## 2. Componenti del Team

### Backend Developers
- **[Alessio Divizia](https://github.com/Lelpoco2)** (Team Leader, Referente Backend) [@Lelpoco2](https://github.com/Lelpoco2)
  
- **[Luca Dipasquale](https://github.com/LucaDipa11)** [@LucaDipa11](https://github.com/LucaDipa11)

- **[Denis Angelo Oniga](https://github.com/Denisang)** [@Denisang](https://github.com/Denisang)

### Frontend Developers
- **[Gloria Paita](https://github.com/Gloria-Pi)** (Referente Frontend) [@Gloria-Pi](https://github.com/Gloria-Pi)

- **[Alessandro Scattaglia](https://github.com/Alessandro-Scattaglia)** [@Alessandro-Scattaglia](https://github.com/Alessandro-Scattaglia)

- **[Cosmin Grosu](https://github.com/Cosmin04729)** [@Cosmin04729](https://github.com/Cosmin04729)

### Digital Strategist
- **[Nicole Andrade](https://github.com/nicoleandrade29)** (Referente Digital Strategy) [@nicoleandrade29](https://github.com/nicoleandrade29)

- **Antonio Perri**

- **[Gaia Medicini](https://github.com/gaiamedicini-rgb)** [@gaiamedicini-rgb](https://github.com/gaiamedicini-rgb)

---

## 3. Tech Stack e Dipendenze

### 3.1 Frontend

**Framework e Librerie Core**
- **React 19.1.1**: Libreria UI con hooks moderni
- **React Router DOM 7.9.6**: Routing client-side con lazy loading
- **Vite 7.1.7**: Build tool ultra-veloce con HMR

**UI e Styling**
- **CSS Modules**: Styling isolato per componenti
- **Phosphor Icons 2.1.10**: Icon library moderna e performante
- **Custom Design System**: Palette colori, tipografia e componenti riutilizzabili

**Dev Tools**
- **ESLint 9.36.0**: Linting e code quality
- **Vite Plugin React 5.0.4**: Supporto JSX e Fast Refresh

### 3.2 Backend

**Framework e Core**
- **Spring Boot 3.5.8**: Framework Java enterprise-grade
- **Java 21**: Ultima versione LTS con performance migliorate
- **Spring Security**: Autenticazione e autorizzazione
- **Spring Data JPA**: ORM e database access layer

**Database e Persistenza**
- **MySQL**: Database relazionale principale
- **Flyway**: Gestione migrazioni database
- **Hibernate**: ORM con supporto JPA
- **Locationtech JTS 1.20.0**: Gestione dati geospaziali

**Sicurezza e Autenticazione**
- **JWT (JJWT 0.13.0)**: Token-based authentication
- **Spring Security**: Authorization framework

**API e Documentazione**
- **SpringDoc OpenAPI 2.8.14**: Swagger UI per documentazione API automatica

**Utilità**
- **Lombok**: Riduzione boilerplate code
- **Spring Mail 4.0.0**: Invio email notifiche
- **Org JSON 20250517**: Parsing e manipolazione JSON

### 3.3 Infrastructure

**Containerization e Orchestration**
- **Docker**: Containerizzazione applicazioni
- **Docker Compose**: Multi-container orchestration
  - `docker-compose.dev.yml`: Ambiente sviluppo locale
  - `docker-compose.devtunnel.yml`: Sviluppo con tunnel remoto
  - `docker-compose.prod.yml`: Ambiente produzione

**Web Server**
- **Nginx**: Reverse proxy e static file serving per frontend

**Database**
- **MySQL 8.x**: Database con supporto geospaziale

---

## 4. Installazione e Getting Started

### 4.1 Prerequisiti

Prima di iniziare, assicurati di avere installato:
- **Docker Desktop** (versione recente con Docker Compose)
- **Git** per clonare il repository
- **(Opzionale) Node.js 18+** per sviluppo frontend locale
- **(Opzionale) Java 21 e Maven** per sviluppo backend locale

### 4.2 Ambienti Disponibili

Il progetto offre tre configurazioni Docker Compose per diversi scenari d'uso:

#### Ambiente DEV (Development)
L'ambiente di sviluppo locale con hot-reload completo per frontend e backend.

📄 **Documentazione completa**: [README.dev.md](docs/README.dev.md)

**Quick Start:**
```bash
# Clona il repository
git clone https://github.com/Lelpoco2/LaboratorioIntegrato_LoopVentures.git
cd LaboratorioIntegrato_LoopVentures

# Crea il file .env (chiedi il contenuto al team leader @Lelpoco2)
# Copia il contenuto fornito in un file chiamato .env nella root

# Avvia l'ambiente
docker-compose -f docker-compose.dev.yml up --build

# Frontend disponibile su: http://localhost:5173
# Backend API su: http://localhost:8080
# Swagger UI su: http://localhost:8080/swagger-ui.html
```

#### Ambiente DEVTUNNEL (Remote Development)
Per sviluppo remoto con accesso tramite tunnel, utile per demo e test da postazioni esterne.

📄 **Documentazione completa**: [README.devtunnel.md](docs/README.devtunnel.md)

**Quick Start:**
```bash
docker-compose -f docker-compose.devtunnel.yml up --build
```

#### Ambiente PROD (Production) ⚠️
> **⚠️ ATTENZIONE**: L'ambiente PROD è in fase di revisione. Si consiglia di utilizzare **DEV** o **DEVTUNNEL**.

📄 **Documentazione completa**: [README.prod.md](docs/README.prod.md)

#### Best Practices e Team Guidelines
Per convenzioni di codifica, gestione Git, struttura commit e pull request:

📄 **Documentazione completa**: [README.team.md](docs/README.team.md)

---

## 5. Referenze per l'API

### Swagger UI (Documentazione Interattiva)
Una volta avviato l'ambiente Docker, la documentazione API interattiva è disponibile su:

🔗 **http://localhost:8080/swagger-ui.html**

Swagger UI fornisce:
- Elenco completo di tutti gli endpoints
- Descrizione parametri e body request
- Esempi di response
- Testing interattivo degli endpoints


---

## 6. Struttura del Progetto

```
LaboratorioIntegrato_LoopVentures/
├── 72Home/
│   ├── backend/                      # Spring Boot Backend
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/_Home/
│   │   │   │   │   ├── config/      # Configurazioni (Security, CORS, JWT)
│   │   │   │   │   ├── controller/  # REST Controllers
│   │   │   │   │   ├── dto/         # Data Transfer Objects
│   │   │   │   │   ├── entity/      # JPA Entities
│   │   │   │   │   ├── repository/  # Spring Data Repositories
│   │   │   │   │   ├── service/     # Business Logic
│   │   │   │   │   └── util/        # Utilities (JWT, Validators)
│   │   │   │   └── resources/
│   │   │   │       ├── application.properties
│   │   │   │       ├── db/migration/    # Flyway migrations
│   │   │   │       └── templates/       # Email templates
│   │   │   └── test/                    # Unit e Integration tests
│   │   ├── pom.xml                      # Maven dependencies
│   │   └── Dockerfile.dev
│   │
│   └── frontend/                     # React Frontend
│       ├── public/                   # Static assets
│       ├── src/
│       │   ├── assets/               # Images, fonts, icons
│       │   │   ├── agents/
│       │   │   ├── background/
│       │   │   └── logo/
│       │   ├── components/           # Componenti riutilizzabili
│       │   │   ├── agents/
│       │   │   ├── banner/
│       │   │   ├── cta-button/
│       │   │   ├── footer/
│       │   │   ├── hero-section/
│       │   │   ├── navbar/
│       │   │   ├── newsletter/
│       │   │   ├── stats/
│       │   │   ├── steps/
│       │   │   ├── why-us/
│       │   │   └── ProtectedRoute.jsx
│       │   ├── pages/
│       │   │   ├── dashboard/        # Admin Dashboard
│       │   │   │   ├── pages/
│       │   │   │   │   ├── agents/
│       │   │   │   │   ├── properties/
│       │   │   │   │   └── users/
│       │   │   │   └── DashBoard.jsx
│       │   │   ├── error/            # 404 Page
│       │   │   ├── evaluator/        # Property Evaluation Form
│       │   │   ├── homepage/         # Landing Page
│       │   │   └── login/            # Login Page
│       │   ├── services/
│       │   │   └── api.js            # Axios API client
│       │   ├── utils/
│       │   │   └── formMapper.js     # Form data mappers
│       │   ├── App.jsx               # Main App Component
│       │   ├── App.css               # Global styles
│       │   └── main.jsx              # Entry point
│       ├── nginx.conf                # Nginx configuration
│       ├── package.json
│       ├── vite.config.js
│       └── Dockerfile.dev
│
├── db-init/                          # Database initialization
│   ├── 01_OmiZonesDump.sql          # Geospatial data dump
│   └── README.md
│
├── docs/                             # Documentazione
│   ├── README.dev.md
│   ├── README.devtunnel.md
│   ├── README.prod.md
│   └── README.team.md
│
├── PDFs/                             # Documenti progetto
│   ├── Briefing 24-26.pdf
│   ├── Calendario 25-26.pdf
│   └── Gruppi_DSG-WDV-SWD.pdf
│
├── .env                              # Environment variables (non committato)
├── .gitignore
├── docker-compose.dev.yml
├── docker-compose.devtunnel.yml
├── docker-compose.prod.yml
└── README.md
```

---

## 7. Routing

L'applicazione utilizza **React Router v7** con lazy loading per ottimizzare le performance.

### 7.1 Public Routes

| Route | Component | Descrizione |
|-------|-----------|-------------|
| `/` | `HomePage` | Landing page con hero, stats, agenti, newsletter |
| `/evaluation` | `Evaluator` | Form multi-step per valutazione immobile (lazy loaded) |
| `/login` | `LoginPage` | Pagina di login con JWT authentication (lazy loaded) |
| `*` | `ErrorPage` | 404 page con navigazione fallback |

### 7.2 Protected Routes (Dashboard)

Tutte le route dashboard sono protette dal componente `ProtectedRoute` che verifica la presenza di un token JWT valido.

| Route | Component | Descrizione |
|-------|-----------|-------------|
| `/dashboard` | `Dashboard` | Overview dashboard amministrativa (lazy loaded) |
| `/dashboard/agenti` | `AgentsPage` | Gestione agenti immobiliari (lazy loaded) |
| `/dashboard/utenti` | `UsersPage` | Gestione utenti registrati (lazy loaded) |
| `/dashboard/immobili` | `PropertiesPage` | Gestione immobili in catalogo (lazy loaded) |

---

## 8. Styling

### 8.1 Design System

#### Palette Colori
```css
/* Primary Colors */
--primary-brown: #612916;
--primary-dark: #432818;
--primary-light: #724c3a;

/* Secondary Colors */
--secondary-beige: #f9f6f3;
--secondary-cream: #ebe4dc;
--secondary-light: #d6c6b4;

/* Text Colors */
--text-primary: #432818;
--text-secondary: #5a4e4e;
--text-muted: #9d8062;

/* Accent Colors */
--accent-white: #ffffff;
--accent-black: rgba(0, 0, 0, 0.8);
```

#### Tipografia
- **Font Family**: "Segoe UI", sans-serif (system font stack per performance)
- **Headings**: 700 font-weight, scale modulare
- **Body**: 400-500 font-weight, 1rem (16px) base size
- **Line Height**: 1.5-1.6 per leggibilità ottimale

#### Spacing System
Basato su multipli di 8px per consistenza:
```
0.5rem (8px), 1rem (16px), 1.5rem (24px), 2rem (32px), 3rem (48px)
```

### 8.2 Responsive Design

#### Breakpoints
```css
/* Mobile first approach */
@media (min-width: 480px)  { /* Large mobile */ }
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 992px)  { /* Desktop */ }
@media (min-width: 1200px) { /* Large desktop */ }
@media (min-width: 1600px) { /* XL desktop */ }
```

---

## 9. Validazione Dati

### 9.1 Validazione Client-Side (Evaluator) – Sintesi

L’**Evaluator** è un form multi-step dinamico che adatta le domande in base alle scelte dell’utente. È suddiviso in macro-sezioni:

- **Indirizzo e Tipologia**: raccoglie dati di localizzazione e tipo di immobile.
- **Caratteristiche dell’immobile**: metratura, locali, bagni, piano; mostra campi condizionali (es. ascensore) in base al piano.
- **Stato e Optional**: stato di conservazione e feature aggiuntive (balcone, giardino, box, ecc.).
- **Contatti**: nome, email, telefono e consenso privacy.

Il flusso è dinamico: alcuni campi compaiono/si nascondono a seconda delle selezioni (es. “ascensore” appare solo se il piano è superiore al primo). La validazione client-side utilizza **regex** per garantire correttezza dei dati (es. formato email RFC-like, numero di telefono italiano `+39` con 9-10 cifre, soli caratteri alfabetici per nome/cognome). I dati vengono normalizzati (trim, lowercase per email) prima dell’invio.

---

## 11. Sicurezza e Autenticazione

### JWT Authentication Flow

1. **Login**: `POST /api/auth/login`
   - Client invia credenziali (email + password)
   - Server valida credenziali
   - Server genera JWT token (validità: 24h)
   - Token ritornato al client

2. **Storage**: Token salvato in `localStorage`
   ```javascript
   localStorage.setItem('token', response.data.token);
   ```

3. **Richieste Autenticate**: Header `Authorization`
   ```javascript
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   ```

4. **Protezione Route**: Componente `ProtectedRoute`
   ```javascript
   const ProtectedRoute = ({ children }) => {
     const token = localStorage.getItem('token');
     return token ? children : <Navigate to="/login" />;
   };
   ```


### Password Hashing
- **BCrypt**: Algoritmo di hashing con salt
- **Strength**: 12 rounds (bilanciamento sicurezza/performance)

### CORS Configuration
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList(
        "http://localhost:5173",  // Dev
        "https://yourdomain.com"  // Prod
    ));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    config.setAllowedHeaders(Arrays.asList("*"));
    config.setAllowCredentials(true);
    return source;
}
```

### Protezioni Implementate
- **SQL Injection**: Prevenuto da JPA/Hibernate prepared statements
- **XSS**: Sanitizzazione input + Content Security Policy headers
- **CSRF**: Token-based (disabilitato per API stateless con JWT)
- **Rate Limiting**: (TODO) Implementare con Spring Boot Actuator

---

## 12. Link Utili

### Ambiente DEV
- 🌐 Frontend: http://localhost:5173
- 🔧 Backend API: http://localhost:8080
- 📚 Swagger UI: http://localhost:8080/swagger-ui.html
- 💾 Database: localhost:3306 (MySQL)

### Documentazione
- 📖 [Team Guidelines](docs/README.team.md) - Best practices, commit conventions, PR structure
- 🛠️ [Dev Environment](docs/README.dev.md) - Setup sviluppo locale completo
- 🌐 [DevTunnel Setup](docs/README.devtunnel.md) - Sviluppo remoto con tunnel
- 🚀 [Production Deployment](docs/README.prod.md) - Deploy in produzione (WIP)

### Repository e Risorse
- 📦 [GitHub Repository](https://github.com/Lelpoco2/LaboratorioIntegrato_LoopVentures)
- 📄 [Project Briefing](PDFs/Briefing%2024-26.pdf)
- 📅 [Calendario e Scadenze](PDFs/Calendario%2025-26.pdf)
- 👥 [Team Composition](PDFs/Gruppi_DSG-WDV-SWD.pdf)
