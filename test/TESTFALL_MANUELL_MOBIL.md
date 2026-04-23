# Testfall - Golfcounter (manuell testning på mobil)

Detta dokument innehåller kompletta manuella testfall för funktion och gränssnitt i Golfcounter.

## 1) Inloggning och konto

### TC-01 Skapa konto (giltiga data)
- **Prioritet:** Hög
- **Steg:**
  1. Öppna appen utloggad.
  2. Fyll i namn, e-post, lösenord, Golf-ID.
  3. Kryssa i samtycke.
  4. Svara rätt på captcha.
  5. Klicka `Registrera`.
- **Förväntat:** Konto skapas, användaren loggas in, appsektion visas.

### TC-02 Skapa konto utan samtycke
- **Prioritet:** Hög
- **Steg:** Upprepa TC-01 men lämna samtycke okryssat.
- **Förväntat:** Tydligt felmeddelande, registrering blockeras.

### TC-03 Skapa konto med ogiltig e-post
- **Prioritet:** Hög
- **Steg:** Ange e-post i fel format och försök registrera.
- **Förväntat:** Valideringsfel visas, registrering blockeras.

### TC-04 Lösenordspolicy
- **Prioritet:** Hög
- **Steg:** Testa för kort/svagt lösenord vid registrering.
- **Förväntat:** Felmeddelande om lösenordskrav, registrering blockeras.

### TC-05 Inloggning korrekt/fel
- **Prioritet:** Hög
- **Steg:**
  1. Logga in med korrekt e-post/lösenord.
  2. Logga ut.
  3. Logga in med fel lösenord.
- **Förväntat:** Inloggning lyckas med korrekt data, tydligt fel vid fel data.

### TC-06 Glömt lösenord
- **Prioritet:** Hög
- **Steg:**
  1. Klicka `Glömt lösenord?`.
  2. Fyll i e-post, Golf-ID, nytt lösenord + bekräftelse, captcha.
  3. Skicka formulär.
- **Förväntat:** Lösenord uppdateras vid korrekt data, annars tydligt fel.

### TC-07 Uppdatera konto
- **Prioritet:** Medel
- **Steg:** Byt namn/Golf-ID, byt lösenord med korrekt nuvarande lösenord.
- **Förväntat:** Konto sparas, uppdaterade värden visas.

### TC-08 Logga ut
- **Prioritet:** Hög
- **Steg:** Logga ut från konto/meny.
- **Förväntat:** Session avslutas och inloggningssektionen visas.

## 2) Meny, navigation och vyer

### TC-09 Hamburgermeny öppna/stäng
- **Prioritet:** Medel
- **Steg:** Öppna/stäng meny med knapp samt klick utanför.
- **Förväntat:** Menyn beter sig stabilt utan visuella fel.

### TC-10 Menyval inloggad
- **Prioritet:** Hög
- **Steg:** Växla mellan `Ny rond`, `Rundor`, `Kontakt`, `Konto`, `Info`, `Donera`.
- **Förväntat:** Rätt vy visas för varje val.

### TC-11 Menyval utloggad
- **Prioritet:** Hög
- **Steg:** Öppna meny utloggad och testa tillgängliga val.
- **Förväntat:** Endast publika val syns/fungerar.

### TC-12 Auto-hide publika vyer (utloggad)
- **Prioritet:** Medel
- **Steg:**
  1. Öppna publik vy utloggad.
  2. Vänta minst 1 minut utan aktivitet.
  3. Repetera medan text skrivs i kontaktformulär.
- **Förväntat:** Vyn auto-döljs utan aktivitet, men hålls öppen under aktiv formulärinmatning.

## 3) Starta och spela rond

### TC-13 Starta rond 9 hål
- **Prioritet:** Hög
- **Steg:** Ange bana, välj 9 hål, starta rond.
- **Förväntat:** Rond startar på hål 1.

### TC-14 Starta rond 18 hål
- **Prioritet:** Hög
- **Steg:** Ange bana, välj 18 hål, starta rond.
- **Förväntat:** Rond med 18 hål startar korrekt.

### TC-15 Lägg till medspelare 0-3
- **Prioritet:** Hög
- **Steg:** Lägg till 1, 2 och 3 medspelare före start.
- **Förväntat:** Alla visas korrekt vid rondstart.

### TC-16 Blockera 4:e medspelare
- **Prioritet:** Hög
- **Steg:** Försök lägga till fler än 3 medspelare.
- **Förväntat:** Begränsning aktiveras och tydligt fel visas.

### TC-17 Plus/minus slag
- **Prioritet:** Hög
- **Steg:** Öka/minska slag på aktiv spelare.
- **Förväntat:** Slag uppdateras direkt, kan inte bli negativt.

### TC-18 Växla aktiv spelare
- **Prioritet:** Hög
- **Steg:** Växla mellan spelare med spelar-knappar.
- **Förväntat:** Rätt spelares slag visas och uppdateras.

### TC-19 Byta hål fram/tillbaka
- **Prioritet:** Hög
- **Steg:** Byt hål flera gånger i hållistan.
- **Förväntat:** Håldata sparas korrekt, status/markeringar stämmer.

### TC-20 Avsluta-knapp endast sista hålet
- **Prioritet:** Hög
- **Steg:** Kontrollera `Avsluta rond` på hål 1, mellanhål och sista hålet.
- **Förväntat:** Knappen syns bara på sista hålet.

### TC-21 Avsluta rond
- **Prioritet:** Hög
- **Steg:** Avsluta rond från sista hålet.
- **Förväntat:** Bekräftelsedialog visas, rond sparas som avslutad.

## 4) Historik och runddetaljer

### TC-22 Lista rundor
- **Prioritet:** Hög
- **Steg:** Öppna `Rundor`.
- **Förväntat:** Rundor listas med senaste först och korrekt metadata.

### TC-23 Visa/dölj detaljer
- **Prioritet:** Medel
- **Steg:** Öppna/stäng detaljer på olika rundor.
- **Förväntat:** Detaljer renderas stabilt.

### TC-24 Redigera avslutad rond
- **Prioritet:** Hög
- **Steg:** Redigera slag i avslutad rond och spara.
- **Förväntat:** Ändringar sparas och visas direkt.

### TC-25 Ta bort avslutad rond
- **Prioritet:** Hög
- **Steg:** Ta bort en avslutad rond via bekräftelsedialog.
- **Förväntat:** Rond tas bort från listan.

### TC-26 Fortsätt pågående rond från historik
- **Prioritet:** Hög
- **Steg:** Klicka `Fortsätt spela` på pågående rond.
- **Förväntat:** Rätt rond laddas med korrekt hål/spelardata.

### TC-27 Avsluta pågående rond från historik
- **Prioritet:** Hög
- **Steg:** Klicka `Avsluta rond` på pågående rond i historik.
- **Förväntat:** Rondstatus uppdateras till avslutad.

## 5) Kontakt och donation

### TC-28 Kontaktformulär giltig
- **Prioritet:** Hög
- **Steg:** Fyll i namn, e-post, meddelande, korrekt captcha, skicka.
- **Förväntat:** Lyckat kvitto visas och meddelandet skickas server-side.

### TC-29 Kontaktformulär feldata/fel captcha
- **Prioritet:** Hög
- **Steg:** Testa tomma fält, ogiltig e-post och fel captcha.
- **Förväntat:** Tydliga felmeddelanden, formulär skickas inte.

### TC-30 Donation mobil Swish
- **Prioritet:** Medel
- **Steg:** Tryck på Swish-knapp på mobil.
- **Förväntat:** Swish deep link öppnas korrekt.

### TC-31 Donation QR-visning
- **Prioritet:** Medel
- **Steg:** Verifiera QR-sektion där Swish-knapp inte visas.
- **Förväntat:** QR visas korrekt proportionerad.

### TC-32 Ko-Fi-knapp
- **Prioritet:** Låg
- **Steg:** Tryck på Ko-Fi-knappen.
- **Förväntat:** Ko-Fi öppnas korrekt.

## 6) Språk och i18n

### TC-33 Byta språk
- **Prioritet:** Hög
- **Steg:** Byt mellan svenska, engelska (UK), engelska (US).
- **Förväntat:** Synliga texter uppdateras korrekt.

### TC-34 Språkpersistens efter omladdning
- **Prioritet:** Medel
- **Steg:** Byt språk och ladda om appen.
- **Förväntat:** Valt språk ligger kvar.

### TC-35 Välkomstmail språk
- **Prioritet:** Medel
- **Steg:** Registrera konto med olika språkval.
- **Förväntat:** Välkomstmail skickas på valt språk.

## 7) PWA, cache och robusthet

### TC-36 Installera PWA
- **Prioritet:** Medel
- **Steg:** Lägg till appen på hemskärmen och öppna den därifrån.
- **Förväntat:** Appen öppnas i PWA-läge och fungerar.

### TC-37 Offlinebeteende
- **Prioritet:** Medel
- **Steg:** Öppna app, slå av nät och navigera.
- **Förväntat:** App shell fungerar; API-åtgärder ger kontrollerade fel.

### TC-38 Cache-uppdatering efter release
- **Prioritet:** Medel
- **Steg:** Verifiera att ny version laddas efter deploy.
- **Förväntat:** Uppdaterad JS/CSS används.

## 8) Säkerhet (rate-limit/captcha/dialog)

### TC-39 Captcha fel flera gånger
- **Prioritet:** Hög
- **Steg:** Skicka fel captcha upprepade gånger i utsatta formulär.
- **Förväntat:** Förfrågningar nekas och ny captcha krävs.

### TC-40 Rate limit login/kontakt
- **Prioritet:** Hög
- **Steg:** Skicka många snabba requests.
- **Förväntat:** Begränsning slår till (ex. 429/felmeddelande).

### TC-41 Dialogrubrik "Golfcounter"
- **Prioritet:** Hög
- **Steg:** Trigga alert/confirm i olika flöden.
- **Förväntat:** Dialogrubrik är `Golfcounter`.

## 9) UI/UX på telefon

### TC-42 Touch-targets
- **Prioritet:** Medel
- **Steg:** Testa alla primära knappar med en hand/tumme.
- **Förväntat:** Knappar är lätttryckta och responsiva.

### TC-43 Scroll/sticky-sektioner
- **Prioritet:** Medel
- **Steg:** Scrolla intensivt under aktiv rond.
- **Förväntat:** Ingen överlappning eller visuella hopp.

### TC-44 Rotation stående/liggande
- **Prioritet:** Medel
- **Steg:** Rotera telefon under aktiv användning.
- **Förväntat:** State behålls och layout håller ihop.

### TC-45 Små skärmar
- **Prioritet:** Medel
- **Steg:** Testa på mindre mobilskärm.
- **Förväntat:** Viktiga komponenter förblir synliga och användbara.
