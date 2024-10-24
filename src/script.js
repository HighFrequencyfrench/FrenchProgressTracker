const episodes = [
    { 
        id: 1, 
        title: "Moving House - Le Déménagement", 
        level: "Beginner 01",
        url: "https://open.spotify.com/episode/2YNKRg1EaPYvgThs1cibda?si=T1kEBrjIQn6RGQNQ6Jh7xQ"
    },
    { 
        id: 2, 
        title: "A Cooking Lesson - Une leçon de cuisine", 
        level: "Beginner 02",
        url: "https://open.spotify.com/episode/2TpmEqW3hZdKfqYZsolT2u?si=BxmYzRByQJ-9yublMXMDZA"
    },
    { 
        id: 3, 
        title: "To The Bakery - À la boulangerie", 
        level: "Beginner 03",
        url: "https://open.spotify.com/episode/08A20m0p38bt36UXMa03Ly?si=uxr3f9YVR0W5HmhiXrJ0tw"
    },
    { 
        id: 4, 
        title: "To The Local Coffee Shop - Au Café du Coin", 
        level: "Beginner 04",
        url: "https://open.spotify.com/episode/39aIxY3cBGnsRinRh3MyIZ?si=mr0Ntg4vSs2Qjy5tvD5weQ"
    },
    { 
        id: 5, 
        title: "The Sunday Market", 
        level: "Beginner 05",
        url: "https://open.spotify.com/episode/33KpMcdKeGpseedWfNr5SD?si=JDDHvt7mTEiFSfCn5YoshA"
    },
    { 
        id: 6, 
        title: "Buying Furniture - Acheter des Meubles", 
        level: "Beginner 06",
        url: "https://open.spotify.com/episode/6HdzfOP8JqGv0TTtGxfwed?si=gRiXBdyoTlSZx-j438p-IQ"
    },
    { 
        id: 7, 
        title: "Hiking The Coastal Path - Randonnée sur le Sentier du Littoral", 
        level: "Beginner 07",
        url: "https://open.spotify.com/episode/6Pv4mcJY8qgoOP8KLQyNKd?si=5-UFki-fTPqev25joSsEdQ"
    },
    { 
        id: 8, 
        title: "Covoiturage vers Biarritz - Carpool to Biarritz", 
        level: "Beginner 08",
        url: "https://open.spotify.com/episode/5HysUdyV6wIrMmjoPOG7XW?si=Q-W23_cLQDiFr_TezCJhwg"
    },
    { 
        id: 9, 
        title: "An Unexpected Weekend in Biarritz - Un Weekend inattendu à Biarritz", 
        level: "Beginner 09",
        url: "https://open.spotify.com/episode/4IuoGukMevv4YVEBxk5DRe?si=v_22tsYRQQ-KJMIhC-aGJw"
    },
    { 
        id: 10, 
        title: "A Day at the Beach - Une Journée à la Plage", 
        level: "Beginner 10",
        url: "https://open.spotify.com/episode/2wc7g8pEu8UAUFs8ICWAVo?si=vr5NMs3yRUCekS2HT1UHmQ"
    },
    { 
        id: 11, 
        title: "The Lost Dog - Le Chien Perdu", 
        level: "Beginner 11",
        url: "https://open.spotify.com/episode/5vKWriOGlKJ0HPtzGtst2X?si=ewb_L1UrSDiA-nbQE1VcOg"
    }
];

const completedEpisodes = new Set();
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const episodesList = document.getElementById('episodes-list');
const shareButton = document.getElementById('share-btn');

// Create episode elements
episodes.forEach(episode => {
    const episodeElement = document.createElement('div');
    episodeElement.className = 'episode';
    episodeElement.innerHTML = `
        <div class="episode-content">
            <span class="episode-number">S02-EP${String(episode.id).padStart(2, '0')}</span>
            <span class="episode-title">${episode.title}</span>
            <span class="episode-level">${episode.level}</span>
        </div>
        <div class="episode-actions">
            <button class="complete-button">Mark as Complete</button>
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
    if (completedEpisodes.has(id)) {
        completedEpisodes.delete(id);
        element.classList.remove('completed');
    } else {
        completedEpisodes.add(id);
        element.classList.add('completed');
    }
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
