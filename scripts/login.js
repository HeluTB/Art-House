//Script to handle form popup, toggling between login and register
var users;
var user;

window.onload = loadUsers; // data loading function to be called when the website loads

function loadUsers() {
    if (localStorage.getItem('users.json') != null) {

        users = JSON.parse(localStorage.getItem('users.json'));
      } else {
        fetch('../data/users.json')
        .then(res => res.json())
        .then(data => {
            users = data; //loading the default users from the json file into an array if it doesn't exist in local storage
        });
      }
}


const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const loginBtn = document.querySelector(".login");
const closeBtn = document.querySelector(".icon-close");
const menuToggle = document.querySelector('.menu-toggle');
const dropdown = document.querySelector('.dropdown');
const registerBtn = document.querySelector('.regBtn');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.querySelector(".nameReg").value;
    const email = document.querySelector(".emailReg").value;
    const password = document.querySelector(".passReg").value;
    const terms = document.querySelector(".termsReg").checked;

    if (validateRegisterForm(username,email,password,terms)) {
        const usr = {
            username: email,
            Email: username,
            pswd: password
        };
        users.push(usr);
        localStorage.setItem('users-data', JSON.stringify(users));
        
    }
});

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
    if(validateLoginForm()){
        window.location.href = '/html/index.html';
        console.log(1);
    }
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
        alert("Please enter a valid email address while loging in.");
        return false;
    }
    const currentUser = users.find((usr) => {
        return usr.Email == email && usr.pswd == password;
    });
    if(!currentUser) {
        alert("Email or password is invalid!");
        return false;
    }
    return true;
}


// Custom validation for registration form
function validateRegisterForm(username,email,password,terms) {
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
    wrapper.classList.remove("active");
    alert('Login now.');
    return true;
}
// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
}
