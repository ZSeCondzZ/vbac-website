// News Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    
    let allNews = [];
    let currentNews = {};
    
    // Load news data
    fetch('../data/news.json')
        .then(response => response.json())
        .then(data => {
            allNews = data;
            displayNewsDetail();
            setupSocialSharing();
        })
        .catch(error => {
            console.error('Error loading news:', error);
            document.getElementById('news-content').innerHTML = `
                <div class="news-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p data-i18n="news_load_error">ไม่สามารถโหลดข่าวสารได้ในขณะนี้ กรุณาลองใหม่ภายหลัง</p>
                </div>
            `;
        });
    
    function displayNewsDetail() {
        if (!newsId) {
            document.getElementById('news-content').innerHTML = `
                <div class="news-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p data-i18n="no_news_selected">ไม่พบข่าวสารที่เลือก</p>
                </div>
            `;
            return;
        }
        
        currentNews = allNews.find(news => news.id.toString() === newsId);
        
        if (!currentNews) {
            document.getElementById('news-content').innerHTML = `
                <div class="news-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p data-i18n="news_not_found">ไม่พบข่าวสารที่คุณกำลังมองหา</p>
                </div>
            `;
            return;
        }
        
        // Display news details
        document.getElementById('news-title').textContent = currentNews.title;
        document.getElementById('news-date').textContent = formatDate(currentNews.date);
        document.getElementById('news-category').textContent = getCategoryName(currentNews.category);
        document.getElementById('news-category').className = `news-category ${currentNews.category}`;
        document.getElementById('news-image').src = currentNews.image;
        document.getElementById('news-image').alt = currentNews.title;
        document.getElementById('news-content').innerHTML = currentNews.content;
        
        // Setup navigation
        setupNewsNavigation();
        
        // Display related news
        displayRelatedNews();
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    function getCategoryName(category) {
        const categories = {
            'announcement': 'ประกาศ',
            'event': 'กิจกรรม',
            'academic': 'วิชาการ',
            'achievement': 'ความสำเร็จ'
        };
        return categories[category] || category;
    }
    
    function setupNewsNavigation() {
        const currentIndex = allNews.findIndex(news => news.id.toString() === newsId);
        
        if (currentIndex > 0) {
            const prevNews = allNews[currentIndex - 1];
            document.getElementById('prev-news').href = `news-detail.html?id=${prevNews.id}`;
        } else {
            document.getElementById('prev-news').style.visibility = 'hidden';
        }
        
        if (currentIndex < allNews.length - 1) {
            const nextNews = allNews[currentIndex + 1];
            document.getElementById('next-news').href = `news-detail.html?id=${nextNews.id}`;
        } else {
            document.getElementById('next-news').style.visibility = 'hidden';
        }
    }
    
    function displayRelatedNews() {
        const relatedNews = allNews
            .filter(news => news.id.toString() !== newsId && news.category === currentNews.category)
            .slice(0, 3);
        
        const relatedNewsContainer = document.getElementById('related-news');
        
        if (relatedNews.length === 0) {
            relatedNewsContainer.innerHTML = `
                <div class="no-related-news">
                    <p data-i18n="no_related_news">ไม่มีข่าวสารที่เกี่ยวข้องในขณะนี้</p>
                </div>
            `;
            return;
        }
        
        relatedNewsContainer.innerHTML = '';
        
        relatedNews.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'related-news-item';
            newsItem.innerHTML = `
                <a href="news-detail.html?id=${news.id}">
                    <div class="related-news-image">
                        <img src="${news.image}" alt="${news.title}">
                    </div>
                    <div class="related-news-content">
                        <div class="related-news-meta">
                            <span class="related-news-date">${formatDate(news.date)}</span>
                        </div>
                        <h3 class="related-news-title">${news.title}</h3>
                    </div>
                </a>
            `;
            relatedNewsContainer.appendChild(newsItem);
        });
    }
    
    function setupSocialSharing() {
        if (!currentNews) return;
        
        const pageUrl = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(currentNews.title);
        const image = encodeURIComponent(currentNews.image);
        
        // Facebook share
        document.querySelector('.social-share.facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        
        // Twitter share
        document.querySelector('.social-share.twitter').href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${title}`;
        
        // Line share
        document.querySelector('.social-share.line').href = `https://social-plugins.line.me/lineit/share?url=${pageUrl}`;
    }
});