// Language Switcher
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'th';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Highlight current language button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Language switcher event listeners
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('language', lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update logo text visibility
            document.querySelectorAll('.logo-text h1').forEach(text => {
                text.style.display = 'none';
            });
            document.querySelector(`.logo-text h1.${lang}`).style.display = 'block';
        });
    });
    
    function setLanguage(lang) {
        // This would be replaced with actual i18n implementation
        // For now, we'll just demonstrate with a few elements
        
        const translations = {
            th: {
                home: "หน้าหลัก",
                about: "เกี่ยวกับวิทยาลัย",
                departments: "สาขาวิชา",
                news: "ข่าวสาร",
                contact: "ติดต่อเรา",
                // Add more translations as needed
            },
            en: {
                home: "Home",
                about: "About",
                departments: "Departments",
                news: "News",
                contact: "Contact",
                // Add more translations as needed
            },
            zh: {
                home: "首页",
                about: "关于学院",
                departments: "专业",
                news: "新闻",
                contact: "联系我们",
                // Add more translations as needed
            }
        };
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
});