//Script to handle form popup, toggling between login and register
var users = [
    {
        username: 'kaleb',
        Email: 'kaleb@gmail.com',
        pswd: '123456'
    },
    {
        username: 'kaleb',
        Email: 'kaleb@gmail.com',
        pswd: '123456'
    },
    {
        username: 'kaleb',
        Email: 'kaleb@gmail.com',
        pswd: '123456'
    },
    {
        username: 'kaleb',
        Email: 'kaleb@gmail.com',
        pswd: '123456'
    },
    {
        username: 'kaleb',
        Email: 'kaleb@gmail.com',
        pswd: '123456'
    }
];
var user = {
    username: 'kaleb',
    Email: 'kaleb@gmail.com',
    pswd: '123456'
};
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const loginBtn = document.querySelector(".login");
const registerBtn = document.querySelector(".btn");
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
registerBtn.addEventListener("click", () => {
    validateRegisterForm();
});

// Close form popup
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
});
menuToggle.addEventListener('click', () => {
    if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
        dropdown.classList.add("show");
        dropdown.style.display = 'flex';
        console.log("i am visible");
    }
    else if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
        dropdown.classList.add("hidden");
        dropdown.style.display = 'none';
    }

});
// Custom validation for login form
function validateLoginForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === "" || password === "") {
        alert("All fields are required.");
        return false;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    const currentUser = users.find((usr) => {
        return usr.Email == email && usr.pswd == password;
    });
    if (currentUser) {
        window.location.href = 'home.html';
    }
    else {
        alert("Email or password is invalid!");
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
    alert("Login now.");
    return true;
}
if (validateRegisterForm() == true) {
    let u = new user;
    u.Email = email;
    u.username = username;
    u.pswd = password;
    users.push(u);
    validateLoginForm();
}
// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
}

