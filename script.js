document.addEventListener('DOMContentLoaded', () => {
    // Скрываем прелоадер после загрузки
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.preloader').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.preloader').style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Загрузка видео
    loadVideos();

    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', newTheme);
    });

    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

    // Поиск видео
    document.querySelector('#searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.video-card').forEach(card => {
            const title = card.querySelector('.video-title').textContent.toLowerCase();
            const description = card.querySelector('.video-description').textContent.toLowerCase();
            card.style.display = title.includes(searchTerm) || description.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Сортировка видео
    document.querySelector('#sortSelect').addEventListener('change', (e) => {
        sortVideos(e.target.value);
    });
});

// Загрузка видео из файла
function loadVideos() {
    fetch('videos.txt')
        .then(response => response.text())
        .then(data => {
            const videoBlocks = data.trim().split('\n\n');
            const videos = [];
            
            videoBlocks.forEach(block => {
                const lines = block.split('\n');
                if (lines.length >= 3) {
                    const [title, description, url, date] = lines;
                    videos.push({
                        title,
                        description,
                        url,
                        date: date || new Date().toISOString().split('T')[0],
                        likes: localStorage.getItem(`video_${title}_likes`) || 0,
                        comments: JSON.parse(localStorage.getItem(`video_${title}_comments`) || '[]')
                    });
                }
            });
            
            renderVideos(videos);
            sortVideos('newest');
            
            // Анимация появления карточек
            gsap.from('.video-card', {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 0.8,
                ease: "back.out",
                delay: 0.5
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки видео:', error);
            document.querySelector('.preloader').style.display = 'none';
        });
}

// Отрисовка видео
function renderVideos(videos) {
    const container = document.getElementById('videoContainer');
    container.innerHTML = '';
    
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        
        // Поддержка VK и YouTube
        let embedUrl;
        if (video.url.includes('vk.com')) {
            const videoId = video.url.split('video')[1].replace(/\D/g, '');
            embedUrl = `https://vk.com/video_ext.php?oid=-${videoId}`;
        } else if (video.url.includes('youtube.com')) {
            const videoId = video.url.includes('youtu.be') 
                ? video.url.split('youtu.be/')[1].split('?')[0]
                : video.url.split('v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        
        videoCard.innerHTML = `
            <div class="video-player-container">
                <iframe class="video-player" src="${embedUrl}" allowfullscreen></iframe>
            </div>
            <div class="video-info">
                <div class="video-title">
                    <span>${video.title}</span>
                    <span class="video-date">${formatDate(video.date)}</span>
                </div>
                <div class="video-description">${video.description}</div>
                <button class="toggle-description">Показать полностью</button>
                <div class="video-stats">
                    <button class="like-btn" data-title="${video.title}">
                        <i class="fas fa-heart"></i>
                        <span>${video.likes}</span>
                    </button>
                    <button class="comment-btn" data-title="${video.title}">
                        <i class="fas fa-comment"></i>
                        <span>${video.comments.length}</span>
                    </button>
                </div>
                <div class="comment-section" data-title="${video.title}">
                    <div class="comments-list">
                        ${video.comments.map(comment => `
                            <div class="comment">
                                <div class="comment-author">${comment.author}</div>
                                <div class="comment-text">${comment.text}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="add-comment">
                        <input type="text" class="comment-input" placeholder="Ваш комментарий...">
                        <button class="comment-submit">Отправить</button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(videoCard);
    });
    
    // Обработчики событий
    setupEventListeners();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Кнопка "Показать полностью"
    document.querySelectorAll('.toggle-description').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const description = e.target.previousElementSibling;
            description.classList.toggle('expanded');
            e.target.textContent = description.classList.contains('expanded') 
                ? 'Свернуть описание' 
                : 'Показать полностью';
        });
    });
    
    // Лайки
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = e.target.closest('.like-btn').dataset.title;
            const likeCount = e.target.querySelector('span');
            
            if (e.target.closest('.like-btn').classList.contains('liked')) {
                // Убрать лайк
                const newCount = parseInt(likeCount.textContent) - 1;
                likeCount.textContent = newCount;
                e.target.closest('.like-btn').classList.remove('liked');
                localStorage.setItem(`video_${title}_likes`, newCount);
            } else {
                // Поставить лайк
                const newCount = parseInt(likeCount.textContent) + 1;
                likeCount.textContent = newCount;
                e.target.closest('.like-btn').classList.add('liked');
                localStorage.setItem(`video_${title}_likes`, newCount);
            }
        });
    });
    
    // Комментарии
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = e.target.closest('.comment-btn').dataset.title;
            const commentSection = document.querySelector(`.comment-section[data-title="${title}"]`);
            commentSection.classList.toggle('expanded');
        });
    });
    
    // Добавление комментариев
    document.querySelectorAll('.comment-submit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = e.target.closest('.comment-section').dataset.title;
            const input = e.target.previousElementSibling;
            const commentText = input.value.trim();
            
            if (commentText) {
                const comments = JSON.parse(localStorage.getItem(`video_${title}_comments`) || '[]');
                comments.push({
                    author: 'Вы',
                    text: commentText,
                    date: new Date().toISOString()
                });
                
                localStorage.setItem(`video_${title}_comments`, JSON.stringify(comments));
                input.value = '';
                
                // Обновляем комментарии
                const commentsList = e.target.closest('.comment-section').querySelector('.comments-list');
                const commentCount = e.target.closest('.video-card').querySelector('.comment-btn span');
                
                commentsList.innerHTML = comments.map(comment => `
                    <div class="comment">
                        <div class="comment-author">${comment.author}</div>
                        <div class="comment-text">${comment.text}</div>
                    </div>
                `).join('');
                
                commentCount.textContent = comments.length;
            }
        });
    });
}

// Сортировка видео
function sortVideos(method) {
    const container = document.getElementById('videoContainer');
    const videos = Array.from(container.children);
    
    videos.sort((a, b) => {
        const aTitle = a.querySelector('.video-title').textContent;
        const bTitle = b.querySelector('.video-title').textContent;
        const aDate = a.querySelector('.video-date').textContent;
        const bDate = b.querySelector('.video-date').textContent;
        const aLikes = parseInt(a.querySelector('.like-btn span').textContent);
        const bLikes = parseInt(b.querySelector('.like-btn span').textContent);
        
        switch (method) {
            case 'newest':
                return new Date(bDate) - new Date(aDate);
            case 'oldest':
                return new Date(aDate) - new Date(bDate);
            case 'popular':
                return bLikes - aLikes;
            default:
                return 0;
        }
    });
    
    videos.forEach(video => container.appendChild(video));
}

// Форматирование даты
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}