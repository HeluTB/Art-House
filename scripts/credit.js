// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('credit-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cardName = document.getElementById('card-name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        // Custom validation
        if (!validateCardName(cardName)) {
            alert('Please enter a valid name on the card.');
            return;
        }

        if (!validateCardNumber(cardNumber)) {
            alert('Please enter a valid card number.');
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            alert('Please enter a valid expiry date (MM/YY).');
            return;
        }

        if (!validateCVV(cvv)) {
            alert('Please enter a valid CVV.');
            return;
        }
        showNotification("You have successfully bought the item!");
        form.reset();
    });

    function validateCardName(name) {
        return name.length >= 3;
    }

    function validateCardNumber(number) {
        // Basic check for a 16-digit card number
        const regex = /^\d{16}$/;
        return regex.test(number);
    }

    function validateExpiryDate(date) {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(date);
    }

    function validateCVV(cvv) {
        const regex = /^\d{3,4}$/;
        return regex.test(cvv);
    }
    function showNotification(message) {
        let notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
      
        document.body.appendChild(notification);
      
        setTimeout(function() {
            notification.remove();
        }, 2500);
        setTimeout(function() {
            window.location.href = '/html/index.html';
        }, 3000);
      }
});
