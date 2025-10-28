# Guida Rapida Ambiente di Sviluppo Docker (DEV)

## Table of Contents

- [1. Ambiente DEV](#1-ambiente-dev)
	- [1.1 Avvio dell'ambiente di sviluppo DEV](#11-avvio-dellambiente-di-sviluppo-dev)
- [2. Servizi disponibili](#2-servizi-disponibili)
- [3. Hot Reload](#3-hot-reload)
	- [3.1 Backend (Spring Boot)](#31-backend-spring-boot)
	- [3.2 Frontend (React--vite)](#32-frontend-react--vite)
	- [3.3 Comandi utili](#33-comandi-utili)
		- [3.3.1 Visualizzare i log](#331-visualizzare-i-log)
		- [3.3.2 Fermare i container](#332-fermare-i-container)
		- [3.3.3 Fermare e rimuovere i volumi (reset completo)](#333-fermare-e-rimuovere-i-volumi-reset-completo)
		- [3.3.4 Ricostruire i container dopo modifiche ai Dockerfile](#334-ricostruire-i-container-dopo-modifiche-ai-dockerfile)
		- [3.3.5 Accedere alla shell di un container](#335-accedere-alla-shell-di-un-container)
- [4. Volumi](#4-volumi)
	- [4.1 Backend](#41-backend)
	- [4.2 Frontend](#42-frontend)
- [5. Troubleshooting](#5-troubleshooting)
	- [5.1 Il backend non si riavvia automaticamente](#51-il-backend-non-si-riavvia-automaticamente)
	- [5.2 Il frontend non aggiorna le modifiche](#52-il-frontend-non-aggiorna-le-modifiche)
	- [5.3 Problemi con i permessi dei file (linuxmac)](#53-problemi-con-i-permessi-dei-file-linuxmac)
	- [5.4 Mysql non si avvia](#54-mysql-non-si-avvia)
- [6. Aggiornamento dipendenze e pacchetti](#6-aggiornamento-dipendenze-e-pacchetti)
	- [6.1 Backend (Spring Boot)](#61-backend-spring-boot)
	- [6.2 Frontend (React--vite)](#62-frontend-react--vite)
- [Note](#note)

## 1. Ambiente DEV

L'ambiente DEV permette lo sviluppo dell'applicativo in condizioni di HOT RELOAD. Ogni modifica apportata ai file sorgente (che non comporta l'aggiunta o la modifica di librerie/dipendenze) viene applicata immediatamente sia in frontend che in backend.


### 1.1 Avvio dell'ambiente di sviluppo DEV

Per avviare l'ambiente di sviluppo con **hot reload** attivo:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Oppure in modalità detached (background) [consigliata]:

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

## 2. Servizi disponibili

- **Frontend (React + Vite)**: http://localhost:5173
- **Backend (Spring Boot)**: http://localhost:8080
- **Database (MySQL)**: localhost:3306 (interno al container)


**Connessione al DB con MySQL Workbench:**
Per connettersi al DB tramite MySQL Workbench, crea una nuova connessione con il tasto '+' vicino a 'MySQL Connection', scegli un nome a piacere e inserisci i seguenti dati:
	- **Hostname:** `localhost`
	- **Port:** porta esterna esposta dal container (default `3307`)
	- **Username:** come impostato nel file `.env`
	- **Password:** come impostato nel file `.env`


Consigliato: testare la connessione tramite il pulsante `Test Connection`.
  

## 3. Hot Reload

### 3.1 Backend (Spring Boot)
- Il hot reload è abilitato tramite **Spring Boot DevTools**.
- Ogni modifica ai file `.java` viene rilevata automaticamente.
- L'applicazione si riavvia automaticamente (restart veloce).
- Porta LiveReload: `35729`.

### 3.2 Frontend (React + Vite)
- Il hot reload è gestito da **Vite**.
- Ogni modifica ai file in `src/` viene rilevata immediatamente.
- Il browser si aggiorna automaticamente senza refresh manuale.
- Server di sviluppo: `http://localhost:5173`.

## 3.3 Comandi utili

### 3.3.1 Visualizzare i log
```bash
# Tutti i servizi
docker-compose -f docker-compose.dev.yml logs -f

# Solo backend
docker-compose -f docker-compose.dev.yml logs -f backend

# Solo frontend
docker-compose -f docker-compose.dev.yml logs -f frontend
```

### 3.3.2 Fermare i container
```bash
docker-compose -f docker-compose.dev.yml down
```

### 3.3.3 Fermare e rimuovere i volumi (reset completo)
```bash
docker-compose -f docker-compose.dev.yml down -v
```

### 3.3.4 Ricostruire i container dopo modifiche ai Dockerfile
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### 3.3.5 Accedere alla shell di un container
```bash
# Backend
docker exec -it app_backend_Spring_dev bash

# Frontend
docker exec -it app_frontend_React_dev sh

# Database
docker exec -it app_database_MySQL_dev bash
```

## 4. Volumi

### 4.1 Backend
- `./backend/test/src` → codice sorgente (read-only)
- `maven_cache` → cache delle dipendenze Maven

### 4.2 Frontend
- `./frontend/my-app/src` → codice sorgente
- `./frontend/my-app/public` → file statici
- `node_modules` → dipendenze npm (volume anonimo)

## 5. Troubleshooting

### 5.1 Il backend non si riavvia automaticamente
1. Verifica che Spring DevTools sia nel `pom.xml`
2. Controlla i log: `docker-compose -f docker-compose.dev.yml logs backend`

### 5.2 Il frontend non aggiorna le modifiche
1. Verifica che Vite sia in esecuzione: controlla i log
2. Prova a fare un hard refresh del browser (Ctrl+Shift+R)

### 5.3 Problemi con i permessi dei file (Linux/Mac)
Assicurati che l'utente Docker abbia i permessi corretti sui file montati.

### 5.4 MySQL non si avvia
Verifica che non ci siano altri servizi MySQL in esecuzione sulla porta 3306.

## 6. Aggiornamento dipendenze e pacchetti

Quando aggiungi nuove dipendenze o pacchetti, è necessario ricostruire il container del servizio interessato per applicare le modifiche.

### 6.1 Backend (Spring Boot)
- Se modifichi il file `pom.xml` (aggiunta/rimozione dipendenze):

```bash
docker-compose -f docker-compose.dev.yml up --build backend
```
oppure in modalità detached:
```bash
docker-compose -f docker-compose.dev.yml up -d --build backend
```

### 6.2 Frontend (React + Vite)
- Se modifichi il file `package.json` (aggiunta/rimozione pacchetti):

```bash
docker-compose -f docker-compose.dev.yml up --build frontend
```
oppure in modalità detached:
```bash
docker-compose -f docker-compose.dev.yml up -d --build frontend
```

Questo assicura che le nuove dipendenze siano installate correttamente nel container.

## Note

- L'ambiente di sviluppo usa volumi per montare il codice sorgente.
- Le modifiche ai file vengono rilevate automaticamente.
- Per modifiche a `pom.xml` o `package.json`, ricostruisci i container (vedi sezione 6).
- I dati del database sono persistiti nel volume `db_data_dev`.