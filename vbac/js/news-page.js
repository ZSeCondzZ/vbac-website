// News Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const newsList = document.getElementById('news-list');
    const pagination = document.getElementById('pagination');
    const categoryFilter = document.getElementById('category-filter');
    const yearFilter = document.getElementById('year-filter');
    const newsSearch = document.getElementById('news-search');
    
    let allNews = [];
    let currentPage = 1;
    const newsPerPage = 6;
    
    // Load news data
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            allNews = data;
            displayNews(allNews, currentPage);
            setupFilters();
        })
        .catch(error => {
            console.error('Error loading news:', error);
            newsList.innerHTML = `
                <div class="news-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p data-i18n="news_load_error">ไม่สามารถโหลดข่าวสารได้ในขณะนี้ กรุณาลองใหม่ภายหลัง</p>
                </div>
            `;
        });
    
    function displayNews(newsData, page) {
        const startIndex = (page - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        const paginatedNews = newsData.slice(startIndex, endIndex);
        
        if (paginatedNews.length === 0) {
            newsList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-newspaper"></i>
                    <p data-i18n="no_news_found">ไม่พบข่าวสารที่ตรงกับเงื่อนไขการค้นหา</p>
                </div>
            `;
        } else {
            newsList.innerHTML = '';
            
            paginatedNews.forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <div class="news-item-image">
                        <img src="${news.image}" alt="${news.title}">
                    </div>
                    <div class="news-item-content">
                        <div class="news-meta">
                            <span class="news-date">${formatDate(news.date)}</span>
                            <span class="news-category ${news.category}">${getCategoryName(news.category)}</span>
                        </div>
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-excerpt">${news.excerpt}</p>
                        <a href="news-detail.html?id=${news.id}" class="read-more" data-i18n="read_more">อ่านเพิ่มเติม <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                newsList.appendChild(newsItem);
            });
        }
        
        setupPagination(newsData.length, page);
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
    
    function setupPagination(totalNews, currentPage) {
        const totalPages = Math.ceil(totalNews / newsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        if (currentPage > 1) {
            paginationHTML += `
                <button class="page-btn prev-btn" data-page="${currentPage - 1}">
                    <i class="fas fa-chevron-left"></i> <span data-i18n="previous">ก่อนหน้า</span>
                </button>
            `;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHTML += `<button class="page-btn active" data-page="${i}">${i}</button>`;
            } else if (
                i === 1 || 
                i === totalPages || 
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                paginationHTML += `<button class="page-btn" data-page="${i}">${i}</button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                paginationHTML += `<span class="ellipsis">...</span>`;
            }
        }
        
        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `
                <button class="page-btn next-btn" data-page="${currentPage + 1}">
                    <span data-i18n="next">ถัดไป</span> <i class="fas fa-chevron-right"></i>
                </button>
            `;
        }
        
        pagination.innerHTML = paginationHTML;
        
        // Add event listeners to page buttons
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentPage = parseInt(this.dataset.page);
                const filteredNews = filterNews();
                displayNews(filteredNews, currentPage);
                window.scrollTo({
                    top: newsList.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    function setupFilters() {
        categoryFilter.addEventListener('change', function() {
            currentPage = 1;
            const filteredNews = filterNews();
            displayNews(filteredNews, currentPage);
        });
        
        yearFilter.addEventListener('change', function() {
            currentPage = 1;
            const filteredNews = filterNews();
            displayNews(filteredNews, currentPage);
        });
        
        newsSearch.addEventListener('input', function() {
            currentPage = 1;
            const filteredNews = filterNews();
            displayNews(filteredNews, currentPage);
        });
    }
    
    function filterNews() {
        const category = categoryFilter.value;
        const year = yearFilter.value;
        const searchTerm = newsSearch.value.toLowerCase();
        
        return allNews.filter(news => {
            // Filter by category
            if (category !== 'all' && news.category !== category) {
                return false;
            }
            
            // Filter by year
            if (year !== 'all') {
                const newsYear = new Date(news.date).getFullYear().toString();
                if (newsYear !== year) {
                    return false;
                }
            }
            
            // Filter by search term
            if (searchTerm) {
                const titleMatch = news.title.toLowerCase().includes(searchTerm);
                const excerptMatch = news.excerpt.toLowerCase().includes(searchTerm);
                const contentMatch = news.content.toLowerCase().includes(searchTerm);
                
                if (!titleMatch && !excerptMatch && !contentMatch) {
                    return false;
                }
            }
            
            return true;
        });
    }
});