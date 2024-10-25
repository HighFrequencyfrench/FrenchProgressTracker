const episodes = [
    { 
        id: 1, 
        title: "Moving House - Le Déménagement", 
        level: "Beginner 01",
        url: "https://open.spotify.com/episode/2YNKRg1EaPYvgThs1cibda?si=T1kEBrjIQn6RGQNQ6Jh7xQ"
    },
    // ... (keep all other episodes)
];

// Initialize completedEpisodes from localStorage instead of empty Set
let completedEpisodes = new Set(JSON.parse(localStorage.getItem('completedEpisodes')) || []);
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const episodesList = document.getElementById('episodes-list');
const shareButton = document.getElementById('share-btn');

// Create episode elements
episodes.forEach(episode => {
    const episodeElement = document.createElement('div');
    episodeElement.className = 'episode';
    // Add completed class if episode was previously completed
    if (completedEpisodes.has(episode.id)) {
        episodeElement.classList.add('completed');
    }
    
    episodeElement.innerHTML = `
        <div class="episode-content">
            <span class="episode-number">S02-EP${String(episode.id).padStart(2, '0')}</span>
            <span class="episode-title">${episode.title}</span>
            <span class="episode-level">${episode.level}</span>
        </div>
        <div class="episode-actions">
            <button class="complete-button">
                ${completedEpisodes.has(episode.id) ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <a href="${episode.url}" target="_blank" class="listen-button">
                <svg width="16" height="16"><use xlink:href="#spotify-icon"/></svg>
                Listen on Spotify
            </a>
        </div>
    `;
    
    const completeButton = episodeElement.querySelector('.complete-button');
    completeButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleEpisode(episode.id, episodeElement);
    });
    
    episodesList.appendChild(episodeElement);
});

function toggleEpisode(id, element) {
    const button = element.querySelector('.complete-button');
    if (completedEpisodes.has(id)) {
        completedEpisodes.delete(id);
        element.classList.remove('completed');
        button.textContent = 'Mark as Complete';
    } else {
        completedEpisodes.add(id);
        element.classList.add('completed');
        button.textContent = 'Mark as Incomplete';
    }
    // Save to localStorage after each change
    localStorage.setItem('completedEpisodes', JSON.stringify([...completedEpisodes]));
    updateProgress();
}

function updateProgress() {
    const progress = (completedEpisodes.size / episodes.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress.toFixed(1)}% Complete (${completedEpisodes.size} of ${episodes.length} episodes)`;
}

shareButton.addEventListener('click', shareProgress);

function shareProgress() {
    const progress = (completedEpisodes.size / episodes.length) * 100;
    const text = `I've completed ${completedEpisodes.size} episodes (${progress.toFixed(1)}%) of French From the Start Season 2! Join me in learning French through stories!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My French Learning Progress',
            text: text,
            url: window.location.href
        }).catch(console.error);
    } else {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    }
}

// Initialize progress on page load
updateProgress();
