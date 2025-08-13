// Survey Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const surveyForm = document.getElementById('survey-form');
    
    if (surveyForm) {
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            let isValid = true;
            const requiredFields = surveyForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value && !(field.type === 'checkbox' && field.checked)) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validate at least one checkbox is checked for checkbox groups
            const checkboxGroups = surveyForm.querySelectorAll('.checkbox-group');
            checkboxGroups.forEach(group => {
                const checkboxes = group.querySelectorAll('input[type="checkbox"]');
                const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
                
                if (!isChecked) {
                    isValid = false;
                    group.classList.add('error');
                } else {
                    group.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Submit to Google Forms
                const formData = new FormData(surveyForm);
                const submitBtn = surveyForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + submitBtn.getAttribute('data-i18n') === 'submit_survey' ? 'กำลังส่งข้อมูล...' : 'Submitting...';
                
                // Create iframe for submission
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden-iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                
                surveyForm.target = 'hidden-iframe';
                
                // Show success message after submission
                setTimeout(() => {
                    surveyForm.innerHTML = `
                        <div class="survey-success">
                            <i class="fas fa-check-circle"></i>
                            <h3 data-i18n="survey_thank_you">ขอบคุณสำหรับการตอบแบบสำรวจ</h3>
                            <p data-i18n="survey_success_message">ข้อมูลของท่านได้รับการบันทึกเรียบร้อยแล้ว</p>
                            <a href="index.html" class="btn" data-i18n="back_to_home">กลับสู่หน้าหลัก</a>
                        </div>
                    `;
                    
                    // Update language if needed
                    if (typeof i18n !== 'undefined') {
                        i18n.updatePage();
                    }
                    
                    document.body.removeChild(iframe);
                }, 2000);
                
                // Submit the form
                surveyForm.submit();
            } else {
                // Show error message
                const errorElement = document.createElement('div');
                errorElement.className = 'form-error';
                errorElement.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <p data-i18n="survey_error_message">กรุณากรอกข้อมูลในช่องที่จำเป็นให้ครบถ้วน</p>
                `;
                
                const existingError = surveyForm.querySelector('.form-error');
                if (existingError) {
                    surveyForm.removeChild(existingError);
                }
                
                surveyForm.insertBefore(errorElement, surveyForm.firstChild);
                
                // Update language if needed
                if (typeof i18n !== 'undefined') {
                    i18n.updatePage();
                }
                
                // Scroll to error
                window.scrollTo({
                    top: errorElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
        
        // Remove error class when interacting with fields
        surveyForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                
                if (this.parentNode.classList.contains('checkbox-group') || 
                    this.parentNode.classList.contains('radio-group')) {
                    this.parentNode.classList.remove('error');
                }
            });
        });
    }
    
    // Alternative: Submit using Fetch API if CORS allows
    // function submitSurvey(data) {
    //     fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             showSuccessMessage();
    //         } else {
    //             throw new Error('Submission failed');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         showErrorMessage();
    //     });
    // }
});