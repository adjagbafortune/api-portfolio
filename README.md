<h1 align="center" id="title">GitHub API Portfolio</h1>



<p id="description" style="text-align: center;" >Une application web dynamique, légère et sans dépendance, conçue pour interagir en temps réel avec l'API REST de GitHub. Elle récupère, filtre et affiche automatiquement les dépôts publics d'un utilisateur.</p>

<h2>Fonctionnalités</h2>

- **Synchronisation en temps réel :** Requêtes HTTP (`fetch`) vers les endpoints publics de GitHub (`api.github.com/users/{username}/repos`).
- **Gestion de la pagination :** Parcours automatique de toutes les pages de résultats pour charger l'intégralité des dépôts.
- **Recherche dynamique :** Filtrage instantané côté client par nom de projet ou par langage de programmation.
- **Tri intelligent :** Organisation des dépôts par date de mise à jour, popularité ou ordre alphabétique.
- **Interface Responsive :** Design adaptatif basé sur CSS Grid et Flexbox pour une consultation fluide sur mobile et desktop.

<h2>Technologies utilisées</h2>

*   HTML5 :La structure sémantique.
*   CSS3 : Variables CSS, Grid, Flexbox et Media Queries (Design inspiré de l'interface native de GitHub).
*   JavaScript (Vanilla) : Fonctions asynchrones (`async/await`), manipulation du DOM et gestion d'événements, sans aucune bibliothèque tierce.

<h2>Démonstration en direct</h2>

[version en production](https://adjagbafortune.github.io/api-portfolio/)

<h2>Installation et utilisation en local</h2>

<p id="description">Le projet ne nécessitant aucun processus de build ou d'installation de paquets, le déploiement local est immédiat :</p>

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone [https://github.com/adjagbafortune/api-portfolio.git](https://github.com/adjagbafortune/api-portfolio.git)

2. Ouvrez le dossier du projet.
3. Lancez simplement le fichier `index.html` dans votre navigateur web préféré.

<h2>Configuration</h2>

Pour adapter ce portfolio à un autre utilisateur GitHub, il suffit de modifier la constante `GITHUB_USERNAME` au début du script dans le fichier `index.html` :

```javascript
// Remplacez 'adjagbafortune' par l'identifiant souhaité
const GITHUB_USERNAME = 'adjagbafortune';
```

* GitHub: [@adjagbafortune](https://www.google.com/search?q=https://github.com/adjagbafortune)
* LinkedIn: [in/sousso-esso-s-f-adjagba](https://www.linkedin.com/in/sousso-esso-s-f-adjagba/)

<h2>🛡️ Licence</h2>

Ce projet est sous [License MIT](LICENSE). Vous êtes libre de l'utiliser, de le modifier et de le distribuer. 
