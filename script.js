'use strict';

// DOM Elements
const form = document.getElementById('contact-form');
const formCard = document.querySelector('.form-card');
const nameInputs = document.querySelectorAll('input[name="fname"], input[name="lname"]');
const emailInput = document.querySelector('input[name="email"]');
const queryInputs = document.querySelectorAll('input[name="queryType"]');
const messageInput = document.querySelector('textarea[name="message"]');
const consentInput = document.querySelector('input[name="consent"]');
const submitButton = document.querySelector('input[type="submit"]');
const radioContainers = document.querySelectorAll('.radio-container');
const modal = document.querySelector('.modal');

// Display error on the form
const showError = (element, errorMsg) => {
    const errorElement = document.createElement('small');
    errorElement.classList.add('error-message');
    errorElement.textContent = errorMsg;
    const container = element.closest('.element-group');
    container.appendChild(errorElement);
    container.style.marginBottom = '12px';
    element.style.borderColor = 'hsl(0, 66%, 54%)';
};

// Reset errors
const resetErrors = () => {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.remove());

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
        const container = input.closest('.element-group');
        if (container) {
            container.style.marginBottom = '';
        }
    });
};

// Validate email
const validateEmail = (emailInput) => {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
        showError(emailInput, 'This field is required.');
        return false;
    } else if (!emailPattern.test(emailValue)) {
        showError(emailInput, 'Please enter a valid email address.');
        return false;
    } else {
        emailInput.style.backgroundColor = 'hsl(0, 0%, 100%)';
        emailInput.style.borderColor = 'hsl(186, 15%, 59%)';
        return true;
    }
};

// Validate form
const validateForm = (e) => {
    e.preventDefault();
    resetErrors();

    let isValid = true;

    // Validate name inputs
    nameInputs.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, 'This field is required.');
            isValid = false;
        } else {
            input.style.backgroundColor = 'hsl(0, 0%, 100%)';
            input.style.borderColor = 'hsl(186, 15%, 59%)';
        }
    });

    // Validate query type inputs
    if (!Array.from(queryInputs).some(radio => radio.checked)) {
        showError(queryInputs[0], 'Please select a query type');
        isValid = false;
    }

    // Validate email
    if (!validateEmail(emailInput)) {
        isValid = false;
    } else {
        emailInput.style.backgroundColor = 'hsl(0, 0%, 100%)';
    }

    // Validate message input
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'This field is required.');
        isValid = false;
    } else {
        messageInput.style.backgroundColor = 'hsl(0, 0%, 100%)';
        messageInput.style.borderColor = 'hsl(186, 15%, 59%)';
    }

    // Validate consent input
    if (!consentInput.checked) {
        showError(consentInput, 'To submit this form, please consent to be contacted.');
        isValid = false;
    } else {
        consentInput.style.color = 'hsl(186, 15%, 59%)';
    }

    // If valid, display the modal
    if (isValid) {
        modal.classList.remove('hidden');
        formCard.style.marginTop = "-5px";
        // form.submit(); 
    }
};

// Handle radio container click
const handleRadioContainerClick = (container) => {
    const radioInput = container.querySelector('input[type="radio"]');
    container.addEventListener('click', () => {
        radioInput.click();
    });
};

// Add event listeners
form.addEventListener('submit', validateForm);
radioContainers.forEach(handleRadioContainerClick);




