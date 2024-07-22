# Consommacteur

## Installation

Veuillez installer npm (inclu avec [nodejs](https://nodejs.org/en)) afin d'installer et utiliser le projet (backend ET frontend)

### Frontend

1. Installer le projet et dépendances :

```bash
cd frontend
npm install
```

2. Renseigner les variables de configuration dans un fichier local-config.js dans le dossier frontend. (le port varie selon la configuration que vous renseignez par la suite pour le serveur)

```js
export const config = {
    API_PORT: 3000,
    API_HOST: 'http://localhost',
};
```

### Backend

1. Installer le projet et dépendances :

```bash
cd backend
npm install
```

2. Créez une base de donnée MySQL (version 8 minimum) avec la méthode de votre choix, [WAMP](https://www.wampserver.com/) remplit parfaitement la tâche sur windows grâce à phpmyadmin inclus.

3. Ensuite importez les données fournies grâce au fichier consommacteur.sql dans la base de donnée, possible via phpmyadmin si vous avez installé wamp. [tutoriel ici](https://help.one.com/hc/fr/articles/115005588189-Comment-importer-une-base-de-donn%C3%A9es-%C3%A0-phpMyAdmin-)


4. Renseigner les variables d'environnement dans un fichier .env dans le dossier backend

```conf
# app configuration
PORT=3000
JWT_SECRET=randomjwtsecret
# db configuration
DB_NAME=yourdbname
DB_USERNAME=yourdbuser
DB_PASSWORD=yourdbpassword
DB_HOST=yourdbhost
DB_PORT=yourdbport
DB_DIALECT=mysql
```

## Lancement des serveurs

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm start
```

## Utilisation

### Connexion

```
email : walter.white@heisenberg.com
mot de passe : PollosH3rmanos
```

### Démarrer les scénarios de simulation

Rendez-vous dans l'onglet administration sur la plateforme, puis cliquez sur le bouton consulter d'un scenario. Cliquez sur le bouton démarrer. Vous pourrer constater dans l'onget mes places que les données évoluent en temps réél. veillez à lancer tout les scénarios pour une immersion maximale# consomacteur
