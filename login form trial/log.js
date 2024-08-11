//Script to handle form popup, toggling between login and register
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const loginBtn = document.querySelector(".login");
const closeBtn = document.querySelector(".icon-close");
const menuToggle = document.querySelector('.menu-toggle');
const dropdown = document.querySelector('.dropdown');

// Show registration form
registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
});

// Show login form
loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

// Show form popup
loginBtn.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
});

// Close form popup
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
});

// Custom validation for login form
function validateLoginForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email !== ""){
        
    }
    if (email === "" || password === "") {
        alert("All fields are required.");
        return false;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

// Custom validation for registration form
function validateRegisterForm() {
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const terms = document.getElementById("terms").checked;
    if (username === "" || email === "" || password === "") {
        alert("All fields are required.");
        return false;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    if (!terms) {
        alert("You must agree to the terms and conditions.");
        return false;
    }
    return true;
}

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
}

menuToggle.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
});
menuToggle.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
});