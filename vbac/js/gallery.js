// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-caption').textContent;
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="${caption}">
                    <div class="lightbox-caption">${caption}</div>
                </div>
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-nav lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox-nav lightbox-next"><i class="fas fa-chevron-right"></i></button>
            `;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Navigation
            const currentIndex = Array.from(galleryItems).indexOf(this);
            
            function showImage(index) {
                if (index >= 0 && index < galleryItems.length) {
                    const newItem = galleryItems[index];
                    const newImgSrc = newItem.querySelector('img').src;
                    const newCaption = newItem.querySelector('.gallery-caption').textContent;
                    
                    lightbox.querySelector('img').src = newImgSrc;
                    lightbox.querySelector('.lightbox-caption').textContent = newCaption;
                }
            }
            
            lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(currentIndex - 1);
            });
            
            lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(currentIndex + 1);
            });
        });
    });
    
    // Close when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                const prevBtn = lightbox.querySelector('.lightbox-prev');
                if (prevBtn) prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                const nextBtn = lightbox.querySelector('.lightbox-next');
                if (nextBtn) nextBtn.click();
            }
        }
    });
});