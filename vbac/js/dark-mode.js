// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeStylesheet = document.createElement('link');
    darkModeStylesheet.rel = 'stylesheet';
    darkModeStylesheet.href = 'css/dark-mode.css';
    darkModeStylesheet.id = 'dark-mode-stylesheet';
    
    // Check for saved user preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        enableDarkMode();
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        if (document.head.contains(darkModeStylesheet)) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    function enableDarkMode() {
        document.head.appendChild(darkModeStylesheet);
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'dark');
    }
    
    function disableDarkMode() {
        document.head.removeChild(darkModeStylesheet);
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'light');
    }
});