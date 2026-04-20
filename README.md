# SE Golfcounter

PHP-webapp for att hantera golfrundor med konton, medspelare och slag per hal.

## Funktioner

- Konto med registrering, inloggning, utloggning och kontouppdatering.
- Starta rond med 9 eller 18 hal.
- Lagga till medspelare i samma rond och rakna slag for alla.
- Autospar till MariaDB nar du byter hal eller avslutar ronden.
- Lokal lagring av aktiv rond i webblasaren (localStorage).
- Meny med vyer for ny rond, rondhistorik och konto.
- Sticky bottenmeny pa mobil for snabb navigering.
- Forstorad typografi i slagvyn for enklare anvandning under spel.
- Rondlista med senaste ronden hogst upp.
- Detaljvy per rond med slag per hal och spelare.
- PWA-stod med manifest, service worker och app-ikon.

## Databas (one.com)

Appen laser anslutning via miljo-variabler:

- `DB_HOST`
- `DB_PORT` (default `3306`)
- `DB_NAME` (default `sharpedge_segolfcounter`)
- `DB_USER`
- `DB_PASS`

Om variabler saknas anvands standardvarden i `config.php`.

## Tabeller

Skapas automatiskt via appen och finns ocksa i `schema.sql`:

- `users`
- `rounds`
- `round_players`

## Lokal korning

```bash
php -S localhost:8000
```

Oppna sedan `http://localhost:8000/index.php`.
