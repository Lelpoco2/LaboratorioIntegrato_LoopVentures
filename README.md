# LaboratorioIntegrato - Loop Ventures 
## Nome Progetto: Da decidere

## Indice
1. [Introduzione](#1-introduzione)
2. [Obiettivi del progetto](#2-obbiettivi-del-progetto)
3. [Struttura del repository](#3-struttura-del-repository-work-in-progress)
4. [Best Practices](#4-best-practices)
    - [Seguire le convenzioni di codifica](#41-seguire-le-convenzioni-di-codifica)
    - [Utilizzare il controllo di versione (Git)](#42-utilizzare-il-controllo-di-versione-git)
    - [Documentare il codice e le decisioni progettuali](#43-documentare-il-codice-e-le-decisioni-progettuali-in-modo-esaustivo)
    - [Collaborazione e comunicazione](#44-collaborazione-e-comunicazione)
5. [Struttura dei commit e delle Pull Request](#5-struttura-commits-e-pr)
    - [Struttura dei messaggi di commit](#51-struttura-dei-messaggi-di-commit)
    - [Tipi di commit](#511-tipi-di-commit)
    - [Struttura delle Pull Request](#52-struttura-delle-pull-request)
6. [Come utilizzare il progetto e ambienti](#6-come-utilizzare-il-progetto-e-ambienti)
    - [Ambiente di sviluppo (DEV)](#61-ambiente-di-sviluppo-dev)
    - [Ambiente di produzione (PROD)](#62-ambiente-di-produzione-prod)
7. [Contribuzione alla documentazione](#7-contribuzione-alla-documentazione)
8. [Disclaimer](#8-disclaimer)

## 1. Introduzione

Questo repository contiene il codice sorgente e la documentazione per il progetto sviluppato dal gruppo Loop Ventures (Gruppo 8) per il corso di Laboratorio Integrato. Il progetto mira a creare una soluzione innovativa per l'azienza Immobiliaris, in ambito di gestione immobiliare.

Maggiori informazioni possono essere trovate nei PDF:

- [Briefing](PDFs/Briefing%2024-26.pdf)
- [Calendario e scadenze](PDFs/Calendario%2025-26.pdf)
- [Gruppi e componenti](PDFs/Gruppi_DSG-WDV-SWD.pdf)


## 2. Obbiettivi del progetto

Realizzazione di un portale web per l’acquisizione di immobili in esclusiva, ispirato al modello di Gromia.com. 
- Campagna paid per generare traffico e conversioni sul portale. 
- Definizione della USP (Unique Selling Proposition) per posizionare il servizio come affidabile, innovativo e vantaggioso. 
- Piano di comunicazione social e strategia di lead generation. 
- Mockup e proposta grafica del portale .


## 3. Struttura del repository (work in progress)

Per ora la struttura proposta è la seguente:

```
.
└── LaboratorioIntegrato-Grupp8 (Da cambiare quando decideremo il nome ufficiale)/
    ├── PDFs     <--- Documentazione ufficiale, elenco gruppi e sadenze
    ├── backend  <--- Applicazione Java (Springboot) e DB (PostgreSQL o MySQL)
    └── frontend <--- Applicazione React (Se voi di frontend volete, se no si metterà un'altra tecnologia)
```

## 4. Best Practices

Tutto quello che concerne le best practices per il progetto verrà aggiunto in questa sezione.

### 4.1 Seguire le convenzioni di codifica 

Utilizzare convenzioni di codifica coerenti per migliorare la leggibilità e la manutenzione del codice, ch verranno definite una volta deciso lo stack di tecnologie da utilizzare

### 4.2 Utilizzare il controllo di versione (Git)

La creazione di branch, commit, pull request e merge dovranno seguire delle regole ben precise, che verranno definite e aggiunte in questa sezione una volta chiariti i ruoli all'interno del team e le responsabilità di ciascun membro.

### 4.3 Documentare il codice e le decisioni progettuali in modo esaustivo.

A differenza di questo README scritto in italiano, tutta la documentazione, creazione di task, messaggi di commit e PR dovrà essere scritta in inglese poichè si tratta dello standard.

### 4.4 Collaborazione e comunicazione

Mantenere una comunicazione aperta e trasparente all'interno del team, se qualcosa non è chiara o si hanno dubbi, chiedere sempre!

## 5. Struttura commits e PR

### 5.1 Struttura dei messaggi di commit

La struttura dei messaggi di commit dovrà risultare tale:

```
<tipo>[ambito(facoltativo)]: <descrizione breve>

<descrizione più dettagliata (facoltativa)>

<BREAKING CHANGES: <quale problema risolve il commit> (facoltativo)>

Closes #<issue_number> (facoltativo)
```

Ovviamente se i commit sono di piccola entità, si potra anche solo usare la prima riga.

### 5.1.1 Tipi di commit

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



### 5.2 Struttura delle Pull Request

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
## 6. Come utilizzare il progetto e ambienti

### 6.1 Ambiente di sviluppo (DEV)

Per non rendere il README principale troppo lungo, le istruzioni su come utilizzare l'ambiente di sviluppo (DEV) sono state spostate in un file linkato di seguito, chiamato [README.dev.md](README.dev.md).

### 6.2 Ambiente di produzione (PROD)

Anche qui le istruzioni su come utilizzare l'ambiente di produzione (PROD) sono state specificate nel file linkato di seguito, chiamato [README.prod.md](README.prod.md).
> Nota: Il `README.prod.md` è ancora in fase di revisione.


## 7. Contribuzione alla documentazione

Ogniuno dei membri del team è incoraggiato a contribuire alla documentazione del progetto, ogni contributo, grande o piccolo, è benvenuto e apprezzato.

## 8. Disclaimer

L'utilizzo in toto di tale documentazione sarà applicato una volta che tutti i membri del team avranno concordato su di esse, e potranno essere modificate in base alle esigenze del progetto e del team stesso. Per ora si tratta di una bozza iniziale.

## Grazie dal Team Leader e buon coding a tutti !