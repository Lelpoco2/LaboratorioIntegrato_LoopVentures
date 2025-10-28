
# Guida Ambiente di Produzione Docker

## Table of Contents

- [1. Introduzione](#1-introduzione)
- [2. Requisiti](#2-requisiti)
- [3. Avvio dell'ambiente di produzione](#3-avvio-dellambiente-di-produzione)
- [4. Servizi disponibili](#4-servizi-disponibili)
- [5. Comandi utili](#5-comandi-utili)
- [6. Aggiornamento dipendenze e pacchetti](#6-aggiornamento-dipendenze-e-pacchetti)
- [7. Troubleshooting](#7-troubleshooting)
- [8. Note](#8-note)

---


## 1. Introduzione

> **Attenzione:** Il profilo di produzione (`prod`) è pensato esclusivamente per test di funzionalità (ad esempio test end-to-end o verifica del deploy). Non utilizzarlo per sviluppo quotidiano o test ripetuti: ogni avvio può impattare dati persistenti e configurazioni reali. Montare il profilo prod solo quando necessario e limitare il numero di avvii.

Questa guida descrive come avviare e gestire l'ambiente di produzione per l'applicativo Dockerizzato basato su React (frontend), Nginx (reverse proxy), Spring Boot (backend) e MySQL (database).

## 2. Requisiti

- Docker e Docker Compose installati
- File di configurazione `docker-compose.prod.yml` presente nella root del progetto
- Variabili d'ambiente configurate correttamente (`.env`)

## 3. Avvio dell'ambiente di produzione

Per avviare tutti i servizi in produzione:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Per avviare in modalità detached (background):

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

Per fermare tutti i servizi:

```bash
docker-compose -f docker-compose.prod.yml down
```

## 4. Servizi disponibili

- **Frontend (React + Nginx)**: http://localhost (porta configurata in `docker-compose.prod.yml`)
- **Backend (Spring Boot)**: http://localhost:8080 (o porta configurata)
- **Database (MySQL)**: accessibile solo dai container, porta interna 3306

## 5. Comandi utili

Visualizzare i log di tutti i servizi:
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

Visualizzare i log di un singolo servizio (es. backend):
```bash
docker-compose -f docker-compose.prod.yml logs -f backend
```

Accedere alla shell di un container:
```bash
# Backend
docker exec -it app_backend_Spring_prod bash

# Frontend
docker exec -it app_frontend_React_prod sh

# Database
docker exec -it app_database_MySQL_prod bash
```

## 6. Aggiornamento dipendenze e pacchetti

Quando aggiungi nuove dipendenze o pacchetti, è necessario ricostruire il container del servizio interessato.

### Backend (Spring Boot)
Se modifichi `pom.xml`:
```bash
docker-compose -f docker-compose.prod.yml up --build backend
```

### Frontend (React)
Se modifichi `package.json`:
```bash
docker-compose -f docker-compose.prod.yml up --build frontend
```

## 7. Troubleshooting

- **Backend non parte**: controlla i log del backend, verifica le variabili d'ambiente e le porte.
- **Frontend non raggiungibile**: verifica la configurazione di Nginx e le porte esposte.
- **Database non accessibile**: assicurati che non ci siano altri servizi MySQL attivi sulla stessa porta.
- **Permessi file**: su Linux/Mac, verifica i permessi dei volumi montati.

## 8. Note

- In produzione, i dati del database sono persistiti nel volume `db_data_prod`.
- Le modifiche ai file sorgente richiedono la ricostruzione dei container per essere applicate.
- Per sicurezza, assicurati di configurare correttamente le variabili d'ambiente e le password.
- In produzione, il frontend viene servito da Nginx e non dal server di sviluppo Vite.