# Giuda Rapida per l'Ambiente di Sviluppo con Tunnel (DEVTUNNEL)

## Attenzione

Data la similitudine del profilo DEVTUNNEL con quello DEV, questa guida si concentra esclusivamente sulle differenze e sulle configurazioni specifiche necessarie per utilizzare il profilo DEVTUNNEL.

> PER LE ISTRUZIONI GENERALI SULL'AMBIENTE DI SVILUPPO E DIVISIONE TRA FRONTEND,BACKEND E DATABASE, FARE RIFERIMENTO AL FILE [README.dev.md](README.dev.md).

## Indice


## 1. Avvio generale dell'ambiente di sviluppo con tunnel

Per avviare l'ambiente di sviluppo con tunnel, eseguire il seguente comando nella cartella del progetto:

```bash
docker-compose -f docker-compose.devtunnel.yml up --build
```
## 2. Configurazione del Tunnel

L'ambiente DEVTUNNEL utilizza un servizio di tunneling di Microsoft per esporre il servizio backend a internet. Assicurarsi di aver configurato correttamente le variabili d'ambiente relative al servizio di tunneling nel file `.env`.

## 2.1 Configurazione porte

Su VS Code, il servizio di tunneling è integrato tramite la finestra "PORTS", visibile nella barra inferiore dell'IDE, corrispondente a quella del "TERMINALE".

Una volta dentro cliccare su "FORWARD A PORT" e inserire:
- 5173 come porta per il frotend 
- 8080 come porta per il backend

Una volta inviato il comando, appariranno due nuove righe nella sezione PORTS di VS Code, corrispondenti alle porte inoltrate e il relativo link generato dal servizio DevTunnel.

Impostare entrambe le porte come "PUBLIC" e come protocollo lasciare "HTTP".

## Attenzione

La piattaforma non è ottimizzata al meglio, quindi dei rallentamenti nella risposta del server potrebbero essere presenti. Si consiglia di utilizzare questo profilo solo per testare funzionalità che richiedono l'accesso esterno, come le webhook o persistenza dei dati nel database tramite richieste esterne.
