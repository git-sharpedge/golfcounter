# Testprotokoll - Golfcounter (manuell testning på mobil)

## Testinformation

- **Projekt:** Golfcounter
- **Testtyp:** Manuell funktionell test + UI-test på mobil
- **Miljö:** Produktion / Staging / Lokal (markera)
- **Build/version:** ................................
- **Datum:** ................................
- **Testare:** ................................

## Enheter och webbläsare

| Enhet | OS-version | Webbläsare | Skärm/läge | Resultat |
|---|---|---|---|---|
| Ex: iPhone 13 | iOS xx | Safari | Stående + liggande | Pass/Fail |
| Ex: Samsung S22 | Android xx | Chrome | Stående + liggande | Pass/Fail |

## Förutsättningar

- Testkonto A (nytt konto) finns/skapas under test.
- Testkonto B (befintligt med historik) finns.
- E-postleverans kan verifieras (kontaktformulär, välkomstmail).
- Nätverk kan växlas (online/offline).
- Browserdata kan rensas mellan utvalda test.

## Sammanfattning

- **Totalt antal testfall:** 45
- **Pass:** ........
- **Fail:** ........
- **Blockerade:** ........
- **Ej körda:** ........

## Avvikelser / buggrapport

| ID | Testfall | Miljö | Steg för att återskapa | Förväntat | Faktiskt | Allvarlighetsgrad | Status |
|---|---|---|---|---|---|---|---|
| BUG-001 | TC-xx | iPhone/Safari | 1...2...3... | ... | ... | Låg/Medel/Hög/Kritisk | Öppen |

## Testrapport per testfall

Fyll i en rad per testfall från `test/TESTFALL_MANUELL_MOBIL.md`.

| TC-ID | Testfall | Prioritet | Resultat (Pass/Fail/Blockerad) | Kommentar | Bevis (skärmdump/video) |
|---|---|---|---|---|---|
| TC-01 | Skapa konto (giltiga data) | Hög |  |  |  |
| TC-02 | Skapa konto utan samtycke | Hög |  |  |  |
| TC-03 | Skapa konto med ogiltig e-post | Hög |  |  |  |
| TC-04 | Lösenordspolicy | Hög |  |  |  |
| TC-05 | Inloggning korrekt/fel | Hög |  |  |  |
| TC-06 | Glömt lösenord | Hög |  |  |  |
| TC-07 | Uppdatera konto | Medel |  |  |  |
| TC-08 | Logga ut | Hög |  |  |  |
| TC-09 | Hamburgermeny öppna/stäng | Medel |  |  |  |
| TC-10 | Menyval inloggad | Hög |  |  |  |
| TC-11 | Menyval utloggad | Hög |  |  |  |
| TC-12 | Auto-hide publika vyer utloggad | Medel |  |  |  |
| TC-13 | Starta rond 9 hål | Hög |  |  |  |
| TC-14 | Starta rond 18 hål | Hög |  |  |  |
| TC-15 | Lägg till medspelare 0-3 | Hög |  |  |  |
| TC-16 | Blockera 4:e medspelare | Hög |  |  |  |
| TC-17 | Plus/minus slag | Hög |  |  |  |
| TC-18 | Växla aktiv spelare | Hög |  |  |  |
| TC-19 | Byta hål fram/tillbaka | Hög |  |  |  |
| TC-20 | Avsluta-knapp endast sista hålet | Hög |  |  |  |
| TC-21 | Avsluta rond | Hög |  |  |  |
| TC-22 | Lista rundor | Hög |  |  |  |
| TC-23 | Visa/dölj detaljer | Medel |  |  |  |
| TC-24 | Redigera avslutad rond | Hög |  |  |  |
| TC-25 | Ta bort avslutad rond | Hög |  |  |  |
| TC-26 | Fortsätt pågående rond från historik | Hög |  |  |  |
| TC-27 | Avsluta pågående rond från historik | Hög |  |  |  |
| TC-28 | Kontaktformulär giltig | Hög |  |  |  |
| TC-29 | Kontaktformulär feldata/fel captcha | Hög |  |  |  |
| TC-30 | Donation mobil Swish | Medel |  |  |  |
| TC-31 | Donation QR-visning | Medel |  |  |  |
| TC-32 | Ko-Fi-knapp | Låg |  |  |  |
| TC-33 | Byta språk | Hög |  |  |  |
| TC-34 | Språkpersistens efter omladdning | Medel |  |  |  |
| TC-35 | Välkomstmail språk | Medel |  |  |  |
| TC-36 | Installera PWA | Medel |  |  |  |
| TC-37 | Offlinebeteende | Medel |  |  |  |
| TC-38 | Cache-uppdatering efter release | Medel |  |  |  |
| TC-39 | Captcha fel flera gånger | Hög |  |  |  |
| TC-40 | Rate limit login/kontakt | Hög |  |  |  |
| TC-41 | Dialogrubrik "Golfcounter" | Hög |  |  |  |
| TC-42 | Touch-targets | Medel |  |  |  |
| TC-43 | Scroll/sticky-sektioner | Medel |  |  |  |
| TC-44 | Rotation stående/liggande | Medel |  |  |  |
| TC-45 | Små skärmar | Medel |  |  |  |
