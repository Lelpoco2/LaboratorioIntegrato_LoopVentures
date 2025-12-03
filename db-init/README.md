# Database Initialization Scripts

Questa directory contiene gli script SQL che verranno eseguiti automaticamente all'avvio del container MySQL.

## Come funziona

MySQL esegue automaticamente tutti i file `.sql` e `.sh` presenti in `/docker-entrypoint-initdb.d/` quando il database viene inizializzato per la prima volta (quando il volume è vuoto).

## Ordine di esecuzione

I file vengono eseguiti in ordine alfabetico. Per controllare l'ordine, puoi usare prefissi numerici:
- `01-schema.sql`
- `02-data.sql`
- `03-procedures.sql`

## Nota importante

Gli script vengono eseguiti **solo la prima volta** che il container MySQL viene avviato con un volume vuoto.

Per rieseguire gli script:
1. Ferma i container: `docker-compose -f docker-compose.dev.yml down`
2. Rimuovi il volume: `docker volume rm laboratoriointegrato_loopventures_db_data_dev`
3. Riavvia: `docker-compose -f docker-compose.dev.yml up --build`

## Esempio

Crea un file `01-init.sql` in questa directory con il contenuto:

```sql
-- Esempio di script di inizializzazione
CREATE TABLE IF NOT EXISTS example (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

INSERT INTO example (name) VALUES ('Test');
```
