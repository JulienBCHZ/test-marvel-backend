# 🦸 Marvel App – Back-End API

Back-End de l’application web inspirée du site officiel Marvel, une réplique.  
Cette API est développée en **JavaScript**, exécutée avec **Node.js**, et sert de couche intermédiaire entre le front-end React et les services externes (une réplique de l'API Marvel) ainsi que la base de données.

---

## 🏗️ Technologies utilisées

- **Node.js**
- **Express.js**
- **JavaScript**
- **Axios** - requêtes HTTP
- **MongoDB** - base de données
- **Mongoose** (ODM)
- **dotenv** - variables d’environnement
- **Bearer Token** - authentification

---

## ⚙️ Fonctionnalités principales

- Authentification des utilisateurs
- Récupération des personnages Marvel
- Récupération des comics Marvel
- Gestion des favoris
- Communication sécurisée avec une réplique de l'API Marvel
- Stockage des utilisateurs et des favoris en base de données

---

## 🔐 Authentification

L’API permet :

- l’inscription d’un utilisateur
- la connexion avec génération d’un **token**
- la protection des routes sensibles via middleware

---

## 🌐 Routes de l’API

### 🔑 Authentification

- `POST /auth/signup` → créer un utilisateur
- `POST /auth/login` → connexion utilisateur

### 🧬 Personnages Marvel

- `GET /characters` → récupérer la liste des personnages
- `GET /character/:id` → récupérer un personnage spécifique

### 📚 Comics Marvel

- `GET /comics` → récupérer la liste des comics
- `GET /comics/:id` → récupérer un comic spécifique
- `GET /comics/:characterId` → récupérer les comics liés à un personnage

### ⭐ Favoris

- `POST /user/favorits/add` → ajouter un favori
- `GET /user/favorits` → récupérer les favoris d’un utilisateur
- `GET /user/favorit/:id` → récupérer un favori via son id
- `DELETE /user/favorit/delete/:id` → supprimer un favori

---

## 🗄️ Base de données

### MongoDB

Deux collections principales sont utilisées :

#### 👤 User

- email
- username
- avatar
- password (hash)

#### ⭐ Favorite

- item title
- item description
- item image (url)
- userId (référence User)

---

## 🔑 API Marvel

La réplique de l'API Marvel est utilisée via **Axios**.  
Les requêtes nécessitent :

- une **API KEY**

Ces informations sont stockées dans les **variables d’environnement**.

---

## ⚙️ Variables d’environnement

Créer un fichier `.env` à la racine du projet :

```bash
env
PORT=3000

MONGODB_URI=your_mongodb_uri
API_KEY=your_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## ▶️ Lancer le projet en local

### Prérequis

- [Node.js](https://nodejs.org/en) installé sur la machine

### Étapes

1. Cloner le dépôt :

```bash
git clone https://github.com/JulienBCHZ/test-marvel-backend
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le projet en mode développement :

```bash
npx nodemon index.js
```

Le serveur démarre par défaut sur :
👉 http://localhost:3000

---

## 📄 License

Ce projet est fourni à des fins éducatives. Il n’est pas destiné à un usage commercial.

---

## 📡 Contact

- Julien Bouchez : julienbouchez@icloud.com
- Profile GitHub : [@JulienBCHZ](https://github.com/JulienBCHZ)
- Profile LinkedIn : [@JulienBouchez](https://www.linkedin.com/in/julien-bouchez-developer/)
