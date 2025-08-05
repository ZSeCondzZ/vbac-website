// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved user preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Toggle Dark Mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', '');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Load News from JSON
document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});

async function fetchNews() {
    try {
        const response = await fetch('data/news.json');
        const newsData = await response.json();
        displayNews(newsData);
    } catch (error) {
        console.error('Error loading news:', error);
        document.getElementById('newsContainer').innerHTML = 
            '<p>ไม่สามารถโหลดข่าวสารได้ในขณะนี้</p>';
    }
}

function displayNews(news) {
    const newsContainer = document.getElementById('newsContainer');
    let newsHTML = '';
    
    // Limit to 3 latest news
    const latestNews = news.slice(0, 3);
    
    latestNews.forEach(item => {
        newsHTML += `
            <div class="news-card">
                <img src="${item.image}" alt="${item.title}" class="news-image">
                <div class="news-content">
                    <p class="news-date">${item.date}</p>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-excerpt">${item.excerpt}</p>
                    <a href="news.html?id=${item.id}" class="read-more">อ่านต่อ</a>
                </div>
            </div>
        `;
    });
    
    newsContainer.innerHTML = newsHTML;
}

// Survey Link
document.getElementById('surveyLink').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://forms.gle/EXAMPLE', '_blank');
});