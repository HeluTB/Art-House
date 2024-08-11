document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showLoginButton = document.getElementById('show-login');
    const showSignupButton = document.getElementById('show-signup');
    const formContainer = document.getElementById('form-container');
    // const homeContainer = document.getElementById('home-container'); // No longer needed

    showLoginButton.addEventListener('click', function () {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    showSignupButton.addEventListener('click', function () {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Handle form submission and navigation
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Simulate validation
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email === 'user@example.com' && password === 'password') {
            // Redirect to gallery page after successful login
            window.location.href = 'gallery.html';
        } else {
            alert('Invalid login credentials');
        }
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Simulate validation
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password === confirmPassword) {
            // Redirect to gallery page after successful sign-up
            window.location.href = 'gallery.html';
        } else {
            alert('Passwords do not match');
        }
    });
});
