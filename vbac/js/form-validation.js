// Form Validation for Contact Form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const phone = contactForm.querySelector('#phone');
            const subject = contactForm.querySelector('#subject');
            const message = contactForm.querySelector('#message');
            let isValid = true;
            
            // Reset errors
            contactForm.querySelectorAll('.error').forEach(error => error.remove());
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate phone (optional)
            if (phone.value.trim() && !isValidPhone(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value.trim()) {
                showError(subject, 'Please enter a subject');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 20) {
                showError(message, 'Message should be at least 20 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Submit form using Formspree or other service
                submitForm(contactForm);
            }
        });
    }
    
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        error.style.color = 'var(--danger-color)';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '5px';
        input.parentNode.appendChild(error);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[0-9\-\+]{9,15}$/;
        return re.test(phone);
    }
    
    function submitForm(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Using Formspree
        fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                form.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank you for your message!</h3>
                        <p>We'll get back to you as soon as possible.</p>
                    </div>
                `;
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>There was an error submitting your form. Please try again later.</p>
            `;
            form.insertBefore(errorElement, form.firstChild);
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
        
        // Alternative: Submit to Google Forms
        // You would need to create a Google Form and set it to collect responses in a spreadsheet
        // Then use the form action URL
        // form.action = 'YOUR_GOOGLE_FORM_ACTION_URL';
        // form.method = 'POST';
        // form.target = '_blank';
        // form.submit();
    }
});