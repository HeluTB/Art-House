// Select all elements with the class 'Buy'
const buyBtns = document.querySelectorAll(".Buy");

// Add a click event listener to each 'Buy' button
buyBtns.forEach(buyBtn => {
    buyBtn.addEventListener('click', () => {
        // Redirect to the credit page when the button is clicked
        window.location.href = '/html/credit.html';
    });
});

// Function to show a notification with a given message
function showNotification(message) {
    let notification = document.createElement('div'); // Create a new div element for the notification
    notification.classList.add('notification'); // Add the 'notification' class to the div
    notification.textContent = message; // Set the text content of the notification
  
    document.body.appendChild(notification); // Add the notification to the document body
  
    // Remove the notification after 2 seconds
    setTimeout(function() {
        notification.remove();
    }, 2000);
}

// Function to add an item to the cart
function addToCart(imageSrc, name, artist, price) {
    // Get the current cart from localStorage, or initialize an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the item already exists in the cart
    let itemExists = cart.some(item => item.image === imageSrc);
    
    if (itemExists) {
        // Show a notification if the item is already in the cart
        showNotification(name + " by " + artist + " is already in your cart!");
        return;
    }
    
    // Create an item object with the provided details
    let item = {
        image: imageSrc,
        name: name,
        artist: artist,
        price: price
    };
    
    // Add the item to the cart array
    cart.push(item);
    
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show a notification that the item has been added to the cart
    showNotification(name + " by " + artist + " has been added to your cart!");
}

// Listen for changes to the 'cart' item in localStorage
window.addEventListener('storage', function(event) {
    if (event.key === 'cart') {
        // Call displayCart() if the 'cart' item changes
        displayCart();
    }
});

// Function to set up event listeners on the home page
function setupHomePage() {
    // Select all elements with the class 'Cart'
    const cartButtons = document.querySelectorAll('.Cart');
  
    // Add a click event listener to each 'Cart' button
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest parent element with the class 'art-item'
            const artItem = this.closest('.art-item');
            
            // Get the image source, name, artist, and price of the art item
            const imageSrc = artItem.querySelector('img').src;
            const name = artItem.querySelector('h2').textContent;
            const artist = artItem.querySelector('.artist').textContent;
            const priceText = artItem.querySelector('p:nth-of-type(2)').textContent;
            
            // Extract the numeric value from the price text
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g,""));
  
            // Add the art item to the cart
            addToCart(imageSrc, name, artist, price);
        });
    });
}

// When the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if the current page is the home page
    if (window.location.pathname.includes('home.html')) {
        // Set up the home page if the URL includes 'home.html'
        setupHomePage();
    }
});
