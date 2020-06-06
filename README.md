# Next-Level-Week

This is a project created during Rocketseat's Next Level Week event.

The idea was to develop a platform to know which nearby establishments do selective collection and which items they collect.

It consisted on a development of a server, a website and an app.
Please note that the Portuguese language was used for the UI.

## Back-end

The server was necessary to store establishments' infos, such as name, contact and a display photo.

It was built using Node with express and uses a SQLite database, which is accessed via knex.

## Front-end

The website is used for establishments to sign up, informing which items they collect.
It has 2 pages:

- [Landing Page](https://github.com/amb-lucas/Next-Level-Week/blob/master/screenshots/web/home.png?raw=true)

- [Establishment Sign Up](https://github.com/amb-lucas/Next-Level-Week/blob/master/screenshots/web/form-vazio.png?raw=true)

- [Establishment Sign Up - Filled](https://github.com/amb-lucas/Next-Level-Week/blob/master/screenshots/web/form-preenchido.png?raw=true)

It was developed using ReactJS and it communicates with the back-end with Axios.

## App

The app is used for users to find the establishments nearby.
It lists all open cases in need of donation and redirects the user to contact the NGO via Email or Whatsapp.

It has a total of 3 pages:

- [Landing](https://github.com/amb-lucas/Next-Level-Week/blob/master/screenshots/mobile/landing.jpeg?raw=true)

- [Landing - City Selecion](https://github.com/amb-lucas/Next-Level-Week/blob/master/screenshots/mobile/input-select.jpeg?raw=true)

- [Establishments Nearby](https://github.com/amb-lucas/Next-Level-Week/blob/master/screenshots/mobile/points-page.jpeg?raw=true)

- [Establishments Nearby - With Items Filtered](https://github.com/amb-lucas/Next-Level-Week/blob/master/screenshots/mobile/points-page-filtered.jpeg?raw=true)

- [Establishment Details](https://github.com/amb-lucas/Next-Level-Week/blob/master/screenshots/mobile/point-details.jpeg?raw=true)

The mobile app was developed using React Native.
It also connects with the IBGE API to render the brazilian states and cities.
