const buyBtn = document.querySelector(".Buy");
buyBtn.addEventListener('click', ()=>{
  window.location.href = '/html/credit.html';
});
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
    
  document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html')) {
        setupHomePage();
    }
  });