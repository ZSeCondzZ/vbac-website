document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset errors
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Validate form
            let isValid = true;
            
            // Name validation
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                document.getElementById('nameError').textContent = 'กรุณากรอกชื่อ-นามสกุล';
                isValid = false;
            }
            
            // Email validation
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                document.getElementById('emailError').textContent = 'กรุณากรอกอีเมล';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').textContent = 'กรุณากรอกอีเมลให้ถูกต้อง';
                isValid = false;
            }
            
            // Phone validation (optional)
            const phone = document.getElementById('phone');
            if (phone.value.trim() && !/^[0-9]{9,10}$/.test(phone.value)) {
                document.getElementById('phoneError').textContent = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก)';
                isValid = false;
            }
            
            // Subject validation
            const subject = document.getElementById('subject');
            if (!subject.value) {
                document.getElementById('subjectError').textContent = 'กรุณาเลือกหัวข้อ';
                isValid = false;
            }
            
            // Message validation
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                document.getElementById('messageError').textContent = 'กรุณากรอกข้อความ';
                isValid = false;
            } else if (message.value.trim().length < 10) {
                document.getElementById('messageError').textContent = 'กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร';
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                // In a real scenario, you would use Formspree or other service
                // For demo purposes, we'll just show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }
});