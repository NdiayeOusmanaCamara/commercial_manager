# Système de Gestion des Commandes
## Description

Ce Système de Gestion des Commandes est une application console développée en Node.js permettant de gérer les clients, les produits, les paiements et les commandes. Il offre des fonctionnalités CRUD (Créer, Lire, Mettre à jour, Supprimer) pour chaque entité, permettant aux utilisateurs d’interagir avec une base de données MySQL pour effectuer diverses opérations, telles que l’ajout, la mise à jour et la suppression des données.

## Prérequis
Pour exécuter ce projet, vous aurez besoin des éléments suivants :

- [Node.js](https://nodejs.org/fr) (version 14 ou supérieure)
- [MySQL](https://www.mysql.com/) (version 5.7 ou supérieure)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :
1. **Clonez le dépot du projet :**

  ```bash
  git clone https://github.com/NdiayeOusmanaCamara/commercial_manager.git
  ```

2. **Accédez au dossier du projet :**

    ```bash
    cd commercial_manager
    ```

3. **Installez les dépendances:**
```bash
npm install
```
4. **Configurez la base de données :**
- Assurez-vous que Mysql est en cours d'exécution sur votre machine locale.
- Mettez les paramètres de connexion dans `src/db.js`

## Utilisation:
Pour démarrer l'application, exécutez la commande suivante :
```bash
node index.js
```
## 5. **Documentation des Fonctions**
### customer.js
 ce module gère les opérations CRUD des de la table **customers**. 
 Il est composé des fonctions suivantes :

 - `get()` : Récupère tous les clients de la base de données.
 - `add(name, address, email, phone) `: Ajoute un nouveau client dans la base de données.
 - `update(id, name, address, email, phone)` : Met à jour les informations d'un client existant dans la base de données.
 - `destroy(id)` : Supprime un client de la base de données.
 
### product.js
Ce module gère les opérations CRUD des de la table **products**.
 - `get()`: Récupère tous les produits de la base de données.
 - `add(name, description, price, stock, category, barcode, status)`:  Ajoute un nouveau produit dans la base de données.
 - `update(id, name, description, price, stock, category, barcode, status)`: Met à jour les informations d'un produit existant dans la base de données.
 - `destroy(id)`: Supprime un produit de la base de données.

### order.js
 - `getOrders()`: Récupère tous les commandes de la base de données.
 - `addOrder(order_date, delivery_address, customer_id, track_number, status)`:Ajoute une commande
 - ` updateOrder(id, order_date, delivery_address, customer_id, track_number, status)`: Met à jour une commande
 - `destroyOrder(orderId) `: Supprime une commande de la base de données

### payment.js
- `get()`: Récupère tous les payements de la base de données.
- `add(order_id, date, amount, payment_method)`: Ajoute un payment
- `update(id, order_id, date, amount, payment_method)`: Met à jour un payment
- `destroy(id)`: Supprime un payement

### Schéma MCD et MLD
1. shéma MCD
![](/src/assets/images/MCD.jpg)
2. shéma MLD
![](/src/assets/images/MLD.jpg)
## Auteur
[N'Diaye Ousmane Camara](https://github.com/NdiayeOusmanaCamara)