// News Loader from JSON or Google Sheets
document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    
    // Load news from JSON file
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            displayNews(data);
        })
        .catch(error => {
            console.error('Error loading news:', error);
            newsContainer.innerHTML = `
                <div class="news-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Unable to load news. Please try again later.</p>
                </div>
            `;
        });
    
    // Alternative: Load news from Google Sheets
    // This would require publishing your Google Sheet to the web as CSV or JSON
    // function loadNewsFromGoogleSheets() {
    //     const sheetId = 'YOUR_SHEET_ID';
    //     const apiKey = 'YOUR_API_KEY';
    //     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
    //     
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => {
    //             const newsData = formatSheetData(data.values);
    //             displayNews(newsData);
    //         })
    //         .catch(error => {
    //             console.error('Error loading news from Google Sheets:', error);
    //         });
    // }
    
    function displayNews(newsItems) {
        newsContainer.innerHTML = '';
        
        // Limit to 6 news items for the homepage
        const recentNews = newsItems.slice(0, 6);
        
        recentNews.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}">
                </div>
                <div class="news-content">
                    <div class="news-date">${formatDate(news.date)}</div>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <a href="news.html?id=${news.id}" class="news-link">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            newsContainer.appendChild(newsCard);
        });
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Helper function to format Google Sheets data
    function formatSheetData(sheetData) {
        if (!sheetData || sheetData.length < 2) return [];
        
        const headers = sheetData[0];
        const rows = sheetData.slice(1);
        
        return rows.map(row => {
            const newsItem = {};
            headers.forEach((header, index) => {
                newsItem[header.toLowerCase()] = row[index] || '';
            });
            return newsItem;
        });
    }
});