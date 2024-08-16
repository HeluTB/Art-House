function showNotification(message) {
    let notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
  
    document.body.appendChild(notification);
  
    setTimeout(function() {
        notification.remove();
    }, 2000);
  }
  function addToCart(imageSrc, name, artist, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemExists = cart.some(item => item.image === imageSrc);
    if (itemExists) {
        showNotification(name + " by " + artist + " is already in your cart!");
        return;
    }
    let item = {
        image: imageSrc,
        name: name,
        artist: artist,
        price: price
    };
    
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showNotification(name + " by " + artist + " has been added to your cart!");
  }
  
  window.addEventListener('storage', function(event) {
    if (event.key === 'cart') {
        displayCart();
    }
  });
  
  function setupHomePage() {
    const cartButtons = document.querySelectorAll('.Cart');
  
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const artItem = this.closest('.art-item');
            const imageSrc = artItem.querySelector('img').src;
            const name = artItem.querySelector('h2').textContent;
            const artist = artItem.querySelector('.artist').textContent;
            const priceText = artItem.querySelector('p:nth-of-type(2)').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g,"")); // Extract numeric value from the price
  
            addToCart(imageSrc, name, artist, price);
        });
    });
  }
  
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    displayCart();
  }
  
  function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cartContainer');
    let totalPrice = 0;
  
    cartContainer.innerHTML = '';
  
    let title = document.createElement('h1');
    title.textContent = 'Your Cart';
    cartContainer.appendChild(title);
  
    cart.forEach(function(item, index) {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cartItem');
  
        let img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        itemDiv.appendChild(img);
  
        let innerDiv = document.createElement('div');
        innerDiv.classList.add('inner-div');
  
        let name = document.createElement('h2');
        name.textContent = item.name;
        innerDiv.appendChild(name);
  
        let artist = document.createElement('p');
        artist.classList.add('artist');
        artist.textContent = "Artist: " + item.artist;
        innerDiv.appendChild(artist);
  
        let price = document.createElement('p');
        price.textContent = "Price: " + item.price + " birr";
        innerDiv.appendChild(price);
  
        itemDiv.appendChild(innerDiv);
  
        let removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', function() {
            removeFromCart(index);
            showNotification("Item has been removed from your cart!");
        });
        itemDiv.appendChild(removeButton);
  
        cartContainer.appendChild(itemDiv);
        totalPrice += item.price;
    });
  
    let bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-div');
  
    let Total = document.createElement('h3');
    Total.textContent = 'Total: ' + totalPrice + ' birr';
    bottomDiv.appendChild(Total);
  
    let checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Proceed to Checkout';
    checkoutButton.id = 'checkoutButton';
    checkoutButton.addEventListener('click', function() {
        if(!totalPrice > 0) {
            showNotification("You have no items in your cart!");
        }
        else{
            window.location.href = 'credit.html';
        }
        
    });
    bottomDiv.appendChild(checkoutButton);
    cartContainer.appendChild(bottomDiv);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
  });