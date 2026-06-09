const GITHUB_USERNAME = 'adjagbafortune';
let allRepos = []; // Stockage global pour le filtrage local

async function fetchGitHubRepos() {
    const container = document.getElementById('repos-container');
    const loader = document.getElementById('loader');
    const searchBar = document.getElementById('search-bar');
    const sortSelect = document.getElementById('sort-select');

    let page = 1;
    let keepFetching = true;

    try {
        // Boucle pour récupérer automatiquement toutes les pages de dépôts publics
        while (keepFetching) {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&page=${page}`);
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status}`);
            }

            const repos = await response.json();
            
            if (repos.length === 0) {
                keepFetching = false; // Plus aucun dépôt à charger, arrêt de la boucle
            } else {
                allRepos = allRepos.concat(repos); // Ajout des dépôts récupérés à la liste principale
                page++; // Passage à la page suivante
            }
        }

        loader.style.display = 'none'; // Masquer le loader

        if (allRepos.length === 0) {
            container.innerHTML = "<p>Aucun dépôt public trouvé pour cet utilisateur.</p>";
            return;
        }

        // Activer les contrôles une fois les données prêtes
        searchBar.removeAttribute('disabled');
        sortSelect.removeAttribute('disabled');
        searchBar.placeholder = `Rechercher parmi les ${allRepos.length} dépôts...`;

        // Premier affichage global (déjà trié par "updated" par défaut par l'API)
        applyFilterAndSort();

        // Écouteurs d'événements pour mettre à jour la liste en temps réel
        searchBar.addEventListener('input', applyFilterAndSort);
        sortSelect.addEventListener('change', applyFilterAndSort);

    } catch (error) {
        console.error(error);
        loader.innerHTML = `❌ Impossible de charger les données de l'API (${error.message}).`;
    }
}

// Fonction maîtresse pour filtrer et trier la liste globale
function applyFilterAndSort() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const sortValue = document.getElementById('sort-select').value;

    // 1. Étape de filtrage textuel
    let processedRepos = allRepos.filter(repo => {
        const nameMatch = repo.name.toLowerCase().includes(searchTerm);
        const langMatch = repo.language && repo.language.toLowerCase().includes(searchTerm);
        return nameMatch || langMatch;
    });

    // 2. Étape de tri
    if (sortValue === 'stars') {
        processedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortValue === 'alpha') {
        processedRepos.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'updated') {
        processedRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    // 3. Affichage du résultat final
    displayRepos(processedRepos);
}

// Fonction pour injecter le HTML des dépôts dans la grille
function displayRepos(reposList) {
    const container = document.getElementById('repos-container');
    container.innerHTML = ""; // Vider le conteneur avant réaffichage

    if (reposList.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #8b949e;'>Aucun dépôt ne correspond à votre recherche.</p>";
        return;
    }

    reposList.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';

        card.innerHTML = `
            <a href="${repo.html_url}" target="_blank" class="repo-title">📦 ${repo.name}</a>
            <p class="repo-desc">${repo.description || 'Aucune description disponible.'}</p>
            <div class="repo-meta">
                <span><span class="lang-dot"></span> ${repo.language || 'Texte'}</span>
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Lancement de la fonction au chargement de la page
fetchGitHubRepos();