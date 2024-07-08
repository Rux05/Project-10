#  Automatisez des tests pour une boutique en ligne

## Description

Ce projet utilise Cypress pour automatiser les tests de trois catégories :
1. Tests d'API via appels API
2. Smoke tests
3. Tests fonctionnels critiques : connexion et panier.

## Prérequis

* Node.js
* npm: Gestionnaire de paquets pour Node.js.
* Docker Desktop
* Visual Studio Code : Éditeur de code recommandé.
* Cypress

## Installation

1. Accédez au [dépôt GitHub del projet](https://github.com/Rux05/Project-10) et suivez les instructions pour cloner ou télécharger le projet.   
2. Accédez au répertoire du projet : **cd votre-repo**  
3. Lancer Docker Desktop
4. Taper en ligne de commande **sudo docker-compose up --build** sur le terminal ouvert dans le dossier du projet
5. Installez les dépendances nécessaires :  **npm install**

## Exécution des Tests Cypress
  Assurez-vous que Docker est en cours d'exécution.       
  Ouvrez Visual Studio Code et accédez au répertoire du projet.      
  Ouvrez un terminal dans Visual Studio Code.

**Mode Interactif**  
  Pour exécuter les tests en mode interactif : **npx cypress open**

**Mode Headless**  
  Pour exécuter les tests en mode headless : **npx cypress run**

## Génération du Rapport
  Pour générer un nouveau rapport détaillé des tests, suivez les étapes ci-dessous :

1. Assurez-vous d'avoir installé les dépendances nécessaires pour la génération du rapport :  
  **npm install mochawesome mochawesome-merge mochawesome-report-generator cypress-multi-reporters --save-dev**  
2. Exécutez les commandes suivantes dans votre terminal :    
  * Pour exécuter les tests Cypress et générer des rapports individuels : **npm run cypress:run**  
  * Pour fusionner les rapports générés : **npm run merge:reports**  
  * Pour générer le rapport final en HTML : **npm run generate:report** 