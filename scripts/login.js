//Script to handle form popup, toggling between login and register
var users = [];
var user;

window.onload = loadUsers; // data loading function to be called when the website loads

function loadUsers() {
    if (localStorage.getItem('users-data') != null) {

        users = JSON.parse(localStorage.getItem('users-data'));
      } else {
        fetch('/scripts/users.json')
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
const loginBtn2 = document.querySelector(".btn");
const closeBtn = document.querySelector(".icon-close");
const registerBtn = document.querySelector('.regBtn');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.querySelector(".nameReg").value;
    const email = document.querySelector(".emailReg").value;
    const password = document.querySelector(".passReg").value;
    const terms = document.querySelector(".termsReg").checked;

    if (validateRegisterForm(username,email,password,terms)) {
        
        const usr = {
            username: username,
            Email: email,
            pswd: password
        };
        users.push(usr);
        localStorage.setItem('users-data', JSON.stringify(users));
        user = usr;
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
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    wrapper.classList.add("active-popup");
});
loginBtn2.addEventListener("click", (e) => {
    e.preventDefault();
    if(validateLoginForm()){
        window.location.href = '/html/home.html';
        console.log(1);
    }
});

// Close form popup
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
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
        alert("Please enter a valid email address while logging in.");
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
