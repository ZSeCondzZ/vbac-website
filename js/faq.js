// FAQ Accordion and Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    const faqSearch = document.getElementById('faq-search');
    
    // Initialize accordion - first item open by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        faqItems[0].querySelector('.faq-answer').style.maxHeight = faqItems[0].querySelector('.faq-answer').scrollHeight + 'px';
    }
    
    // Toggle FAQ items
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentNode;
            const answer = this.nextElementSibling;
            
            // Close all other items
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                    faq.querySelector('.faq-answer').style.maxHeight = null;
                    faq.querySelector('.faq-question i').className = 'fas fa-chevron-down';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                this.querySelector('i').className = 'fas fa-chevron-up';
            } else {
                answer.style.maxHeight = null;
                this.querySelector('i').className = 'fas fa-chevron-down';
            }
        });
    });
    
    // Filter by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.categories.includes(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    faqSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 0) {
            // Show all items when searching
            categoryButtons.forEach(btn => {
                if (btn.dataset.category === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Highlight matching text
                    highlightText(item, searchTerm);
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            // Reset when search is empty
            faqItems.forEach(item => {
                item.style.display = 'block';
                removeHighlights(item);
            });
            
            document.querySelector('.faq-category-btn[data-category="all"]').click();
        }
    });
    
    function highlightText(element, searchTerm) {
        removeHighlights(element);
        
        const question = element.querySelector('.faq-question span');
        const answer = element.querySelector('.faq-answer');
        
        highlightTextInNode(question, searchTerm);
        highlightTextInNode(answer, searchTerm);
    }
    
    function highlightTextInNode(node, searchTerm) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            const regex = new RegExp(searchTerm, 'gi');
            const newText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
            
            if (newText !== text) {
                const span = document.createElement('span');
                span.innerHTML = newText;
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
            node.childNodes.forEach(child => {
                highlightTextInNode(child, searchTerm);
            });
        }
    }
    
    function removeHighlights(element) {
        const highlights = element.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }
});