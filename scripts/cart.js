// Function to show a notification message on the screen for a brief period
function showNotification(message) {
  let notification = document.createElement('div'); // Create a div element to display the notification
  notification.classList.add('notification'); // Apply a CSS class for styling
  notification.textContent = message; // Set the text content of the notification

  document.body.appendChild(notification); // Add the notification to the page

  // Automatically remove the notification after 2 seconds
  setTimeout(function() {
      notification.remove(); // Remove the notification from the DOM
  }, 2000);
}

// Function to add an art item to the shopping cart
function addToCart(imageSrc, name, artist, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the current cart from local storage, or initialize an empty array if no cart exists

  // Check if the item is already in the cart by comparing image sources
  let itemExists = cart.some(item => item.image === imageSrc);
  if (itemExists) {
      showNotification(name + " by " + artist + " is already in your cart!"); // Notify the user that the item is already in the cart
      return; // Exit the function to prevent duplicate entries
  }

  // Create a new item object with the provided details
  let item = {
      image: imageSrc,
      name: name,
      artist: artist,
      price: price
  };

  cart.push(item); // Add the new item to the cart array
  localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart back to local storage

  showNotification(name + " by " + artist + " has been added to your cart!"); // Notify the user that the item was successfully added
}

// Event listener to detect changes in local storage and update the cart display accordingly
window.addEventListener('storage', function(event) {
  if (event.key === 'cart') {
      displayCart(); // If the cart has changed, refresh the cart display
  }
});

// Function to set up the home page by adding event listeners to all 'Add to Cart' buttons
function setupHomePage() {
  const cartButtons = document.querySelectorAll('.Cart'); // Select all elements with the class 'Cart'

  // Loop through each 'Add to Cart' button and add a click event listener
  cartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const artItem = this.closest('.art-item'); // Get the closest parent element with the class 'art-item'
          const imageSrc = artItem.querySelector('img').src; // Extract the image source URL
          const name = artItem.querySelector('h2').textContent; // Extract the name of the art item
          const artist = artItem.querySelector('.artist').textContent; // Extract the artist's name
          const priceText = artItem.querySelector('p:nth-of-type(2)').textContent; // Extract the price text
          const price = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Convert the price text to a numeric value

          addToCart(imageSrc, name, artist, price); // Add the selected item to the cart
      });
  });
}

// Function to remove an item from the cart by its index and update the display
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the current cart from local storage

  cart.splice(index, 1); // Remove the item at the specified index from the cart array
  localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart back to local storage

  displayCart(); // Refresh the cart display to reflect the removal
}

// Function to display the contents of the cart on the cart page
function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the current cart from local storage
  let cartContainer = document.getElementById('cartContainer'); // Get the container element where the cart items will be displayed
  let totalPrice = 0; // Initialize the total price to zero

  cartContainer.innerHTML = ''; // Clear any existing content in the cart container

  // Create and add a title for the cart
  let title = document.createElement('h1');
  title.textContent = 'Your Cart'; // Set the title text
  cartContainer.appendChild(title); // Add the title to the cart container

  // Loop through each item in the cart and create elements to display them
  cart.forEach(function(item, index) {
      let itemDiv = document.createElement('div'); // Create a div element to contain the cart item details
      itemDiv.classList.add('cartItem'); // Apply a CSS class for styling

      let img = document.createElement('img'); // Create an image element for the cart item
      img.src = item.image; // Set the image source
      img.alt = item.name; // Set the alt text for accessibility
      itemDiv.appendChild(img); // Add the image to the item div

      let innerDiv = document.createElement('div'); // Create an inner div for text details
      innerDiv.classList.add('inner-div'); // Apply a CSS class for styling

      let name = document.createElement('h2'); // Create an element for the item name
      name.textContent = item.name; // Set the name text
      innerDiv.appendChild(name); // Add the name to the inner div

      let artist = document.createElement('p'); // Create an element for the artist's name
      artist.classList.add('artist'); // Apply a CSS class for styling
      artist.textContent = "Artist: " + item.artist; // Set the artist text
      innerDiv.appendChild(artist); // Add the artist to the inner div

      let price = document.createElement('p'); // Create an element for the item price
      price.textContent = "Price: " + item.price + " birr"; // Set the price text
      innerDiv.appendChild(price); // Add the price to the inner div

      itemDiv.appendChild(innerDiv); // Add the inner div to the item div

      // Create a remove button for each cart item and add an event listener to handle removal
      let removeButton = document.createElement('button');
      removeButton.textContent = "Remove"; // Set the button text
      removeButton.classList.add('remove-btn'); // Apply a CSS class for styling
      removeButton.addEventListener('click', function() {
          removeFromCart(index); // Remove the item from the cart when the button is clicked
          showNotification("Item has been removed from your cart!"); // Show a notification that the item was removed
      });
      itemDiv.appendChild(removeButton); // Add the remove button to the item div

      cartContainer.appendChild(itemDiv); // Add the item div to the cart container
      totalPrice += item.price; // Accumulate the total price
  });

  // Create and add the total price and a checkout button
  let bottomDiv = document.createElement('div'); // Create a div element for the total price and checkout button
  bottomDiv.classList.add('bottom-div'); // Apply a CSS class for styling

  let Total = document.createElement('h3'); // Create an element to display the total price
  Total.textContent = 'Total: ' + totalPrice + ' birr'; // Set the total price text
  bottomDiv.appendChild(Total); // Add the total price to the bottom div

  // Create a checkout button and add an event listener to handle the checkout process
  let checkoutButton = document.createElement('button');
  checkoutButton.textContent = 'Proceed to Checkout'; // Set the button text
  checkoutButton.id = 'checkoutButton'; // Assign an ID for potential styling or further scripting
  checkoutButton.addEventListener('click', function() {
      if (!totalPrice > 0) { // Check if the total price is greater than zero
          showNotification("You have no items in your cart!"); // Notify the user if the cart is empty
      } else {
          window.location.href = 'credit.html'; // Redirect to the checkout page if the cart is not empty
      }
  });
  bottomDiv.appendChild(checkoutButton); // Add the checkout button to the bottom div
  cartContainer.appendChild(bottomDiv); // Add the bottom div to the cart container
}

// Event listener to initialize the cart display when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('cart.html')) { // Check if the current page is the cart page
      displayCart(); // Display the cart contents if on the cart page
  }
});
