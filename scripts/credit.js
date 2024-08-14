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
        // Regular expression to match only alphabetic characters and spaces
        const regex = /^[A-Za-z\s]+$/;
        if(name.length<3){
            alert('Name should be longer than 2 characters.');
            return false;
        }
        if(name.length >50){
            alert('You can\'t input morethan 50 characters for a name.' );
            return false;
        }
        if(!regex.test(name)){
            alert('Please enter a valid name.');
            return false;
        }
        return true;
    }
    

    function validateCardNumber(number) {
        // Basic check for a 16-digit card number
        const regex = /^\d{16}$/;
        return regex.test(number);
    }

    function validateExpiryDate(date) {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    
        // First check if the date matches the MM/YY format
        if (!regex.test(date)) {
            return false;
        }
    
        // Extract the month and year from the input
        const [inputMonth, inputYear] = date.split('/').map(Number);
    
        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
        const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
    
        // Check if the year is in the future or the current year with a valid month
        if (inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth)) {
            return true;
        }
    
        return false;
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
