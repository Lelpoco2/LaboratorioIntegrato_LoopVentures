# Guida Rapida — Ambiente di Sviluppo (DEV)

## Indice

1. [Avvio generale dell'ambiente di sviluppo](#1-avvio-generale-dellambiente-di-sviluppo)
2. [Utilizzo Servizio Frontend](#2-utilizzo-servizio-frontend)
    - [Informazioni base](#21-informazioni-base)
    - [Vedere i log del frontend](#22-vedere-i-log-del-frontend)
    - [Cosa fare se si aggiungono nuovi pacchetti con NPM](#23-cosa-fare-se-si-aggiungono-nuovi-pacchetti-con-npm)
    - [Fermare l'ambiene e rimuovere i container](#33-fermare-lambiene-e-rimuovere-i-container)
    - [Troubleshooting frontend](#34-troubleshooting-frontend)
3. [Utilizzo backend + Database(MySQL)](#3-utilizzo-backend--databasemysql)
    - [Informazioni base](#31-informazioni-base)
    - [Vedere i log di backend](#32-vedere-i-log-di-backend)
    - [Cosa fare se si aggiungono nuove dipendenza al pom.xml](#33-cosa-fare-se-si-aggiungono-nuove-dipendenza-al-pomxml)
    - [Fermare l'ambiente e rimuovere i container](#34-fermare-lambiente-e-rimuovere-i-container)
    - [Connessione al database tramite MySQL Workbench](#35-connessione-al-database-tramite-mysql-workbench)

Ambiente di sviluppo basato su Docker Compose con **hot reload** per:
- Backend: Spring Boot
- Frontend: React + Vite
- I dati del database sono persistenti tra i riavvii.

## Requisiti
- Docker Desktop (Compose v2 incluso) oppure Docker + docker-compose
- (Opzionale) Client MySQL / MySQL Workbench


## 1. Avvio generale dell'ambiente di sviluppo

Per l'avvio dell'ambiente di sviluppo, eseguire il seguente comando nella cartella del progetto:

```bash
# Avvio normale 
docker-compose -f docker-compose.dev.yml up --build

# Avvio in background (consigliato, dato che non blocca il terminale)
docker-compose -f docker-compose.dev.yml up -d --build
```
***IMPORTANTE:** al primo avvio, il processo di build dell'ambiente DEV potrebbe richiedere diversi minuti (anche più di 5) per scaricare le immagini Docker necessarie e compilare il progetto.*  

Utilizzare Docker Desktop per monitorare containers, immagini e volumi creati.

## 2. Utilizzo Servizio Frontend

Questa sezione fornisce istruzione su come utilizzare il servizio frontend dell'ambiente DEV.\
I collaboratori interessati sono: @Cosmin04729, @Gloria-Pi, @Alessandro-Scattaglia.

### 2.1 Informazioni base

Il container del servizio React-Vite frontend è chiamato `app_frontend_React_dev`, visibile anche su Docker Desktop o tramite CLI di Docker con il comando `docker ps`.

Una volta avviato l'ambiente di sviluppo con tutti i suoi componenti, il frontend sarà accessibile all'indirizzo:

`http://localhost:5173`

L'applicativo React supporta il **hot reload**, quindi ogni modifica al codice sorgente (nella cartella `frontend/`) verrà automaticamente riflessa nell'app in esecuzione senza necessità di riavviare il container.


>**!Nota bene:!**\
Il frontend comunica con il `app_backend_Spring_dev` tramite l'URL:\
 `http://localhost:8080` (configurato in `frontend/src/config.js`).\
 Questo permette al frontend di interagire con le API REST fornite dal backend Spring Boot, se necessario.

Tutte le chiamate API fatte dal frontend verso il backend saranno indirizzate normalmente a questo URL:

`http://localhost:8080/api/<NomeAPI>`

### 2.2 Vedere i log del frontend

Per avere un riscontro immediato se il servizio funziona regolarmente, si possono attivare i log in tempo reale del frontend, eseguire il comando:

```bash
# Vedere i log in tempo reale del FE
docker-compose -f docker-compose.dev.yml logs -f frontend
```

Se si nota, ogni volta che verrà modificato e salvato un file sorgente del frontend, verrà aggiunta una riga al log che indica che il file è stato rigenerato e la modifica applicata correttamente.

### 2.3 Cosa fare se si aggiungono nuovi pacchetti con NPM

Nel caso vengano aggiunti nuovi pacchetti NPM al progetto frontend (ad esempio, installando nuove librerie), è necessario ricostruire l'immagine Docker del servizio frontend per includere i nuovi pacchetti.

**NON E' NECESSARIO RIAVVIARE L'INTERO AMBIENTE**

Per riavviare solo il servizio frontend, eseguire:

```bash
# Avvio in background 
docker-compose -f docker-compose.dev.yml up -d --build frontend
```

In questo modo verrà ricostruita solo l'immagine del servizio frontend, mantenendo in esecuzione gli altri servizi (backend e database) senza interruzioni e riducendo le tempistiche di avvio.

### 3.3 Fermare l'ambiente e rimuovere i container

Quando si ha finito di sviluppare e si vuole interrompere l'ambiente DEV, eseguire il comando:

```bash
# Fermare il servizio
docker-compose -f docker-compose.dev.yml down
```
Tale comando fermerà e rimuoverà tutti i container dell'ambiente, pur mantenendo dati come librerie e cache per gli avvi futuri, che saranno molto più veloci del primo avvio.

### 3.4 Troubleshooting frontend

Data la ridotta conoscenza di Docker da parte del team frontend, in caso di problemi con il servizio frontend, si consiglia di:

1. Contattare in primis il team backend (@Lelpoco2, @LucaDipa11, @Denisang) per verificare che il problema non sia legato al backend o alla comunicazione tra frontend e backend.

2. Provare a riavviare l'ambiente


## 3. Utilizzo backend + Database(MySQL)

Questa sezione fornisce istruzione su come utilizzare il servizio backend dell'ambiente DEV.
I collaboratori interessati sono: @Lelpoco2, @LucaDipa11, @Denisang

### 3.1 Informazioni base

Il container del servizio Spring Boot backend è chiamato `app_backend_Spring_dev`, visibile anche su Docker Desktop o tramite CLI di Docker con il comando `docker ps`.

Una volta avviato l'ambiente di sviluppo con tutti i suoi componenti, il backend non sarà comunque accessibile direttamente via browser, ma solo tramite: 
- Chimate API REST dal frontend React-Vite
- Chiamate API REST tramite tool come Postman, ThunderClient, curl (Linux)

L'URL da inserire per chiamare correttamente le API è:

`http://localhost:8080/api/<NomeAPI>`

Tali risposte saranno codificate in **formato JSON**

### 3.2 Vedere i log di backend

Per avere un riscontro immediato se il servizio funziona regolarmente, si possono attivare i log in tempo reale del backend, eseguire il comando:

```bash
# Vedere i log in tempo reale del BE
docker-compose -f docker-compose.dev.yml logs -f backend
```
Se si nota, ogni volta che verrà modificato e salvato un file sorgente del backend, l'app Spring si riavvierà, indicando che il file è stato rigenerato e la modifica applicata correttamente.

### 3.3 Cosa fare se si aggiungono nuove dipendenza al pom.xml

Come nel caso del frontend, se si aggiungono nuove dipendenze al file `pom.xml` del backend Spring Boot, è necessario ricostruire l'immagine Docker del servizio backend per includere le nuove dipendenze.

**ANCHE QUI NON E' NECESSARIO RIAVVIARE L'INTERO AMBIENTE**

Per riavviare solo il servizio backend, eseguire:

```bash
# Avvio in background
docker-compose -f docker-compose.dev.yml up -d --build backend
```

### 3.4 Fermare l'ambiente e rimuovere i container

Quando si ha finito di sviluppare e si vuole interrompere l'intero ambiente DEV, eseguire il comando:

```bash
# Fermare l'ambiente
docker-compose -f docker-compose.dev.yml down
```

## 4 Connessione al database tramite MySQL Workbench

Per facilitare la gestione e visualizzazione del Database Dev in MySQL in esecuzione nel container `app_database_MySQL_dev`, si consiglia di utilizzare un client MySQL come MySQL Workbench.

Per potersi connettere al Database MySQL in esecuzione nel container, utilizzare le seguenti credenziali:

- Nome connessione: Facoltativa (Es. App Database DEV Container)
- Hostname: `localhost`
- Port: `3307` <- Nota: la porta 3306 è mappata internamente al container, esponendo esternamente la 3307 per evitare conflitti con eventuali istanze MySQL locali
- Per questioni di sicurezza, i restanti dati saranno forniti privatamente al team di sviluppo backend del team leader (root password, DB name, user, user password)

Tali dati dovranno essere immessi nel file `.env.example`, per poi essere rinominato in `.env`, in modo che il backend Spring Boot possa connettersi correttamente al database MySQL in esecuzione nel container.