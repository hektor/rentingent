# 1819-mobdev1-code-template

## Included

- Handlebars (https://handlebarsjs.com/)
- Navigo (https://github.com/krasimir/navigo)
- Mapbox GL (https://www.mapbox.com/mapbox-gl-js/api/)
- Firebase (https://firebase.google.com/docs/web/setup)
- SASS (and SCSS)
- ESLint with AirBnB Style Guide (https://github.com/airbnb/javascript)

## What you will need

- [Node (version lower than 10.x.x)](https://nodejs.org/en/download/releases/)
- Eslint extension for Visual Studio Code (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Getting started

1. Install all the modules by executing

   > npm i

2. Add your firebase config to the `src/database/firebase.js` file

The Web API Key and Project ID can be found here:

> https://console.firebase.google.com/project/{your-project}/settings/general/

3. Run the app on a webserver instance

   > npm run start

4. To run create a new build
   > npm run build

## Requirements

#### Als kotbaas

- ~~Registreren en inloggen met email/password~~
- **EXTRA:** Registreren en inloggen met Google account
- Beheer studentenkot
  - ~~Studentenkot toevoegen~~
    - **EXTRA:** Er kunnen enkel studentenkoten worden toegevoegd waarvan het adres zich in de Gentse kotzone bevindt.  
      Gebruik hiervoor de kotzones van [https://data.stad.gent/data/42 (Koppelingen naar een externe site.)Koppelingen naar een externe site.](https://data.stad.gent/data/42) en sla de zones op in de localstorage van de client
  - Studentenkot -waarvan hij/zij de eigenaar is- bewerken
  - Studentenkot -waarvan hij/zij de eigenaar is- verwijderen
- Berichten
  - Antwoorden op berichten van studenten (kotbazen kunnen niet zelf een conversatie beginnen)
    - Een (web) notification krijgen bij een nieuw bericht
- Social Media
  - Een kot delen op social media

#### Als student

- ~~Registreren en inloggen met email/password~~
- **EXTRA:** Registreren en inloggen met Google account
- Zoeken

  - Tinderspel spelen met de beschikbare studentenkoten
    - Sorteer de koten van dicht naar ver (hogeschool/uni -> kot)
  - ~~Lijst tonen met alle studentenkoten~~
    - Sorteerbaar op afstand
  - Kaart te tonen met alle studentenkoten
  - Filteren
    - Type
    - Huurprijs (van x - x)
    - Oppervlakte
    - Afstand (van x - x)
  - Mogelijk om een detailpagina van een kot te bekijken

- Berichten
  - Berichten sturen naar kotbazen
  - Een (web) notification krijgen bij een nieuw bericht
- Favorieten
  - Een kot toevoegen aan favorieten
  - Een kot verwijderen van favorieten
  - Een lijst met favoriete koten bekijken
- Social Media
  - Een kot delen op social media

---

## NOTES

## TODO

#zoek-kot

- fix event listeners after sort select
