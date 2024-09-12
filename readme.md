# Système de Gestion des Commandes
## Description

Ce Système de Gestion des Commandes est une application console développée en Node.js permettant de gérer les clients, les produits, les paiements et les commandes. Il offre des fonctionnalités CRUD (Créer, Lire, Mettre à jour, Supprimer) pour chaque entité, permettant aux utilisateurs d’interagir avec une base de données MySQL pour effectuer diverses opérations, telles que l’ajout, la mise à jour et la suppression des données.

## Fonctionnalités

-    Gestion des Clients : Ajouter, mettre à jour, lister et supprimer des clients.
-    Gestion des Produits : Ajouter, mettre à jour, lister et supprimer des produits, avec des détails tels que le prix, le stock et la catégorie.
-    Gestion des Paiements : Ajouter, mettre à jour, lister et supprimer des paiements, incluant les méthodes de paiement et les montants.
-    Gestion des Commandes : Ajouter, mettre à jour, lister et supprimer des commandes, avec la possibilité de gérer les détails des commandes, tels que les informations sur les produits et les quantités.


## Prérequis
Pour exécuter ce projet, vous aurez besoin des éléments suivants :

- [Node.js](https://nodejs.org/fr)
- [MySQL](https://www.mysql.com/)
- [readline-sync](https://www.npmjs.com/package/readline-sync)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :
1. **Clonez le repository :**

  ```bash
  git clone https://github.com/NdiayeOusmanaCamara/ABC_ProductManagement.git
  ```

2. **Accédez au dossier du projet :**

    ```bash
    cd ABC_ProductManagement
    ```
3. **Configurez la base de données MySQL :**
- Créez une nouvelle base de données MySQL.
- Importez le fichier SQL fourni pour créer les tables nécessaires :
mysql -u votreUtilisateur -p votreNomDeBaseDeDonnées < orderManager.sql
4. **Mettez à jour le fichier db.js avec vos identifiants MySQL :**
```
const pool = mysql.createPool({
    host: 'localhost',
    user: 'votreUtilisateur',
    password: 'votreMotDePasse',
    database: 'votreNomDeBaseDeDonnées'
});
```

5. **Installez les dépendances Node.js requises :**
```
npm install
```
## Utilisation:
1. Démarrez l’application en utilisant cette commande:
```
node index.js
```
2. Suivez les instructions dans la console pour gérer les clients, produits, paiements et commandes.

## Auteur
[N'Diaye Ousmane Camara](https://github.com/NdiayeOusmanaCamara)