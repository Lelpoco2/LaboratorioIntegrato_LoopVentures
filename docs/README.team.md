# 1. LaboratorioIntegrato - Loop Ventures
## 1.1 Nome Progetto: Estimora (previously 72Home)

## Indice
1. [Introduzione](#1-introduzione)
2. [Componenti del team](#2-componenti-del-team)
3. [Obiettivi del progetto](#3-obbiettivi-del-progetto)
4. [Struttura del repository](#4-struttura-del-repository-work-in-progress)
5. [Best Practices](#5-best-practices)
    - [5.1 Seguire le convenzioni di codifica](#51-seguire-le-convenzioni-di-codifica)
    - [5.2 Utilizzare il controllo di versione (Git)](#52-utilizzare-il-controllo-di-versione-git)
    - [5.3 Documentare il codice e le decisioni progettuali](#53-documentare-il-codice-e-le-decisioni-progettuali-in-modo-esaustivo)
    - [5.4 Collaborazione e comunicazione](#54-collaborazione-e-comunicazione)
6. [Struttura dei commit e delle Pull Request](#6-struttura-commits-e-pr)
    - [6.1 Struttura dei messaggi di commit](#61-struttura-dei-messaggi-di-commit)
    - [6.1.1 Tipi di commit](#611-tipi-di-commit)
    - [6.2 Struttura delle Pull Request](#62-struttura-delle-pull-request)
7. [Come utilizzare il progetto e ambienti](#7-come-utilizzare-il-progetto-e-ambienti)
    - [7.1 Ambiente di sviluppo (DEV)](#71-ambiente-di-sviluppo-dev)
    - [7.2 Ambiente di produzione (PROD)](#72-ambiente-di-produzione-prod)
    - [7.3 Ambiente di sviluppo con tunnel (DEVTUNNEL)](#73-ambiente-di-sviluppo-con-tunnel-devtunnel)
8. [Utilizzo di Swagger](#8-utilizzo-di-swagger)
9. [Link utili](#9-link-utili)
10. [Contribuzione alla documentazione](#10-contribuzione-alla-documentazione)
11. [Disclaimer](#11-disclaimer)

## 1. Introduzione

Questo repository contiene il codice sorgente e la documentazione per il progetto sviluppato dal gruppo **Loop Ventures (Gruppo 8)** per il corso di Laboratorio Integrato. Il progetto mira a creare una soluzione innovativa per l'azienza Immobiliaris, in ambito di gestione immobiliare.

Maggiori informazioni possono essere trovate nei PDF:

- [Briefing](PDFs/Briefing%2024-26.pdf)
- [Calendario e scadenze](PDFs/Calendario%2025-26.pdf)
- [Gruppi e componenti](PDFs/Gruppi_DSG-WDV-SWD.pdf)


## 2. Componenti del team
### Backend Devs
- [Alessio Divizia](https://github.com/Lelpoco2) (Team leader, Referente Backend): @Lelpoco2
- [Luca Dipasquale](https://github.com/LucaDipa11): @LucaDipa11
- [Denis Angelo Oniga](https://github.com/Denisang): @Denisang
### Frontend Devs
- [Gloria Paita](https://github.com/Gloria-Pi) (Referente Frontend) : @Gloria-Pi
- [Alessandro Scattaglia](https://github.com/Alessandro-Scattaglia): @Alessandro-Scattaglia
- [Cosmin Grosu](https://github.com/Cosmin04729): @Cosmin04729
### Digital Strategist
- [Nicole Andrade](https://github.com/nicoleandrade29) (Referente Digital Strategy): @nicoleandrade29
- Antonio Perri: 
- [Gaia Medicini](https://github.com/gaiamedicini-rgb): @gaiamedicini-rgb


## 3. Obbiettivi del progetto

Realizzazione di un portale web per l’acquisizione di immobili in esclusiva, ispirato al modello di Gromia.com. 
- Campagna paid per generare traffico e conversioni sul portale. 
- Definizione della USP (Unique Selling Proposition) per posizionare il servizio come affidabile, innovativo e vantaggioso. 
- Piano di comunicazione social e strategia di lead generation. 
- Mockup e proposta grafica del portale .


## 4. Struttura del repository

Per ora la struttura proposta è la seguente:

```bash
.
└── LaboratorioIntegrato-Grupp8/
    ├── 72Home/
    │   ├── backend/                  # Codice sorgente del backend
    │   ├── frontend/                 # Codice sorgente del frontend
    ├── db-init/                # Script di inizializzazione del database
    ├── PDFs/                   # Documenti relativi al progetto
    ├── .env                     # File di configurazione delle variabili d'ambiente (non pubblico nella repository) e bisogna crearlo localmente, chiedere il la condivisione del contenuto al team leader @Lelpoco2
    ├── .gitignore               # File per ignorare file e cartelle specifiche nel controllo di versione
    ├── docker-compose.dev.yml       # File di configurazione per Docker Compose profilo DEV
    ├── docker-compose.devtunnel.yml      # File di configurazione per Docker Compose profilo DEVTUNNEL
    ├── docker-compose.prod.yml      # File di configurazione per Docker Compose
    └── README.dev.md                # Documentazione del profilo DEV del progetto
    └── README.prod.md               # Documentazione del profilo PROD del progetto 
```

## 5. Best Practices

Tutto quello che concerne le best practices per il progetto verrà aggiunto in questa sezione.

### 5.1 Seguire le convenzioni di codifica 

Utilizzare convenzioni di codifica coerenti per migliorare la leggibilità e la manutenzione del codice, ch verranno definite una volta deciso lo stack di tecnologie da utilizzare

### 5.2 Utilizzare il controllo di versione (Git)

La creazione di branch, commit, pull request e merge dovranno seguire delle regole ben precise, che verranno definite e aggiunte in questa sezione una volta chiariti i ruoli all'interno del team e le responsabilità di ciascun membro.

### 5.3 Documentare il codice e le decisioni progettuali in modo esaustivo.

A differenza di questo README scritto in italiano, tutta la documentazione, creazione di task, messaggi di commit e PR dovrà essere scritta in inglese poichè si tratta dello standard.

### 5.4 Collaborazione e comunicazione

Mantenere una comunicazione aperta e trasparente all'interno del team, se qualcosa non è chiara o si hanno dubbi, chiedere sempre!

## 6. Struttura commits e PR

### 6.1 Struttura dei messaggi di commit

La struttura dei messaggi di commit dovrà risultare tale:

```
<tipo>[ambito(facoltativo)]: <descrizione breve>

<descrizione più dettagliata (facoltativa)>

<BREAKING CHANGES: <quale problema risolve il commit> (facoltativo)>

Closes #<issue_number> (facoltativo)
```

Ovviamente se i commit sono di piccola entità, si potra anche solo usare la prima riga.

### 6.1.1 Tipi di commit

Qui sotto sono riportati vari tipi di commit da poter usare come riferimento:

| Type   | Description                                                                                                                                           |
|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| feat   | con le modifiche viene introdotta una nuova funzionalità                                                                                              |
| fix    | è stata effettuata una correzione di bug                                                                                                              |
| chore  | modifiche che non riguardano correzioni o funzionalità e non modificano i file src o test (ad esempio aggiornamento delle dipendenze)                 |
| refactor | rifattorizzazione del codice che non corregge bug e non aggiunge funzionalità                                                                      |
| docs   | aggiornamenti alla documentazione, come il README o altri file markdown                                                                               |
| style  | modifiche che non influenzano il significato del codice, generalmente legate alla formattazione (spazi, punto e virgola mancanti, ecc.)               |
| test   | aggiunta di nuovi test o correzione di test esistenti                                                                                                 |
| perf   | miglioramenti delle prestazioni                                                                                                                       |
| ci     | modifiche relative alla continuous integration                                                                                                        |
| build  | modifiche che influenzano il sistema di build o le dipendenze esterne                                                                                 |
| revert | annulla un commit precedente                                                                                                                          |



### 6.2 Struttura delle Pull Request

Per quanto riguarda le pull request, la struttura dovrà essere la seguente:

```bash
## What?

<Descrizione dettagliata di cosa fa la PR>

## How?

<Descrizione di come è stato implementato il codice>

## Testing?

<Descrizione dei test effettuati per verificare il corretto funzionamento del codice>

## Anything Else?

<Altre informazioni rilevanti sulla PR>
```

> Le pull requests indirizzate nel main branch saranno revisionate dal team leader (@Lelpoco2) o da un membro del team di backend designato per la revisione del codice, prima di essere mergiate nel branch principale.

## 7. Come utilizzare il progetto e ambienti

Quando si avvia il progetto, assicurarsi di aver configurato correttamente le variabili d'ambiente nel file `.env`, che non è presente nella repository per motivi di sicurezza. Chiedere al team leader (@Lelpoco2) il contenuto del file per poterlo creare localmente.

### 7.1 Ambiente di sviluppo (DEV)

Per non rendere il README principale troppo lungo, le istruzioni su come utilizzare l'ambiente di sviluppo (DEV) sono state spostate in un file linkato di seguito, chiamato [README.dev.md](README.dev.md).

### 7.2 Ambiente di produzione (PROD)

Anche qui le istruzioni su come utilizzare l'ambiente di produzione (PROD) sono state specificate nel file linkato di seguito, chiamato [README.prod.md](README.prod.md).
> Nota: Il `README.prod.md` è ancora in fase di revisione.
> SI SCONSIGLIA L'UTILIZZO DELL'AMBIENTE PROD IN QUANTO PER QUESTIONI DI TEMPO NON SI È POTUTO COMPLETARE LA CONFIGURAZIONE, **USARE L'AMBIENTE DEV** e **DEV TUNNEL**.

### 7.3 Ambiente di sviluppo con tunnel (DEVTUNNEL)

Le istruzioni su come utilizzare l'ambiente di sviluppo con tunnel (DEVTUNNEL) sono disponibili nel file [docker-compose.devtunnel.yml](docker-compose.devtunnel.yml). Questo ambiente è pensato per facilitare lo sviluppo remoto e l'accesso tramite tunnel, utile per demo o test da postazioni esterne.

Per avviare l'ambiente DEVTUNNEL:

```bash
docker-compose -f docker-compose.devtunnel.yml up --build
```

Assicurasi di aver configurato correttamente le variabili d'ambiente e di aver seguito le istruzioni specifiche riportate nel file `docker-compose.devtunnel.yml` e nella documentazione interna del progetto.

Per ulteriori dettagli, consulta la documentazione o chiedi al team leader.

## 8. Utilizzo di Swagger

Nel recente update della repo è stato aggiunto il supporto a Swagger, consultabile tramite l'url: `localhost:8080/swagger-ui.html` una volta avviata l'applicazione su docker.

## 9. Link utili

Questi link sono da utilizzare una volta avviato l'ambiente corrispondente al paragrafo.

### 9.1 Link per ambiente DEV:
- [README.dev.md](docs/README.dev.md) - Documentazione completa per l'ambiente di sviluppo (DEV)
- `localhost:5173` - URL per accedere al frontend React in ambiente DEV
### 9.2 Link per ambiente PROD:
- [README.prod.md](docs/README.prod.md) - Documentazione completa per l'ambiente di produzione (PROD)
> NON COMPLETO
### 9.3 Link per ambiente DEVTUNNEL:
- [README.devtunnel.md](docs/README.devtunnel.md) - Documentazione completa per l'ambiente di sviluppo con tunnel (DEVTUNNEL)
- localhost:5173 - URL per accedere al frontend React in ambiente DEVTUNNEL

## 10. Contribuzione alla documentazione

Ogniuno dei membri del team è incoraggiato a contribuire alla documentazione del progetto, ogni contributo, grande o piccolo, è benvenuto e apprezzato.

## 11. Disclaimer

L'utilizzo in toto di tale documentazione sarà applicato una volta che tutti i membri del team avranno concordato su di esse, e potranno essere modificate in base alle esigenze del progetto e del team stesso.

## Grazie dal Team Leader e buon coding a tutti !