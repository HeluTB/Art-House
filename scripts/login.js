// Array to store users and a variable for the current user
var users = [];
var user;

// Load users data when the window loads
window.onload = loadUsers; // data loading function to be called when the website loads

// Function to load users from local storage or a JSON file
function loadUsers() {
    // Check if 'users-data' exists in local storage
    if (localStorage.getItem('users-data') != null) {
        // Parse and load users data from local storage
        users = JSON.parse(localStorage.getItem('users-data'));
    } else {
        // If 'users-data' is not found in local storage, fetch it from a JSON file
        fetch('/scripts/users.json')
        .then(res => res.json()) // Convert the response to JSON
        .then(data => {
            users = data; // Load the default users from the JSON file into the array
        });
    }
}

// Selecting DOM elements for login and registration functionalities
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const loginBtn = document.querySelector(".login");
const loginBtn2 = document.querySelector(".btn");
const closeBtn = document.querySelector(".icon-close");
const registerBtn = document.querySelector('.regBtn');

// Event listener for the register button
registerBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission
    const username = document.querySelector(".nameReg").value; // Get the value of the username input field
    const email = document.querySelector(".emailReg").value; // Get the value of the email input field
    const password = document.querySelector(".passReg").value; // Get the value of the password input field
    const terms = document.querySelector(".termsReg").checked; // Check if the terms and conditions checkbox is checked

    // Validate the registration form
    if (validateRegisterForm(username, email, password, terms)) {
        // Create a user object with the form data
        const usr = {
            username: username,
            Email: email,
            pswd: password
        };
        // Add the user to the users array
        users.push(usr);
        // Save the updated users array to local storage
        localStorage.setItem('users-data', JSON.stringify(users));
        // Set the current user
        user = usr;
    }
});

// Event listener to show the registration form
registerLink.addEventListener("click", () => {
    wrapper.classList.add("active"); // Add the 'active' class to the wrapper element
});

// Event listener to show the login form
loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active"); // Remove the 'active' class from the wrapper element
});

// Event listener to show the form popup
loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default action
    wrapper.classList.add("active-popup"); // Add the 'active-popup' class to the wrapper element
});

// Event listener for the secondary login button
loginBtn2.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default action
    if (validateLoginForm()) {
        // Redirect to the home page if the login form is valid
        window.location.href = '/html/home.html';
        console.log(1); // Log a message for debugging purposes
    }
});

// Event listener to close the form popup
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active-popup"); // Remove the 'active-popup' class from the wrapper element
});

// Function to validate the login form
function validateLoginForm() {
    const email = document.getElementById("email").value; // Get the value of the email input field
    const password = document.getElementById("password").value; // Get the value of the password input field

    // Check if email or password is empty
    if (email === "" || password === "") {
        alert("All fields are required."); // Show an alert if any field is empty
        return false;
    }

    // Validate the email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address while logging in."); // Show an alert if the email format is invalid
        return false;
    }

    // Find the user in the users array with the matching email and password
    const currentUser = users.find((usr) => {
        return usr.Email == email && usr.pswd == password;
    });

    // If the user is not found, show an alert
    if (!currentUser) {
        alert("Email or password is invalid!");
        return false;
    }

    // Return true if the login form is valid
    return true;
}

// Function to validate the registration form
function validateRegisterForm(username, email, password, terms) {
    // Check if any field is empty
    if (username === "" || email === "" || password === "") {
        alert("All fields are required."); // Show an alert if any field is empty
        return false;
    }

    // Validate the email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address."); // Show an alert if the email format is invalid
        return false;
    }

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
        alert("Password must be at least 6 characters long."); // Show an alert if the password is too short
        return false;
    }

    // Check if the terms and conditions checkbox is checked
    if (!terms) {
        alert("You must agree to the terms and conditions."); // Show an alert if the checkbox is not checked
        return false;
    }

    wrapper.classList.remove("active"); // Remove the 'active' class from the wrapper element
    alert('Login now.'); // Show an alert prompting the user to log in
    return true;
}

// Function to validate the email format
function validateEmail(email) {
    // Regular expression to validate email format
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase()); // Test the email against the regular expression
}
