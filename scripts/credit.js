// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the form element by its ID
    const form = document.getElementById('credit-form');

    // Add an event listener to handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        
        // Retrieve the values entered in the form fields and trim any extra whitespace
        const cardName = document.getElementById('card-name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        // Perform custom validation on the form fields
        if (!validateCardName(cardName)) {
            return; // Exit the function if the name validation fails
        }

        if (!validateCardNumber(cardNumber)) {
            alert('Please enter a valid card number.');
            return; // Exit the function if the card number validation fails
        }

        if (!validateExpiryDate(expiryDate)) {
            alert('Please enter a valid expiry date (MM/YY).');
            return; // Exit the function if the expiry date validation fails
        }

        if (!validateCVV(cvv)) {
            alert('Please enter a valid CVV.');
            return; // Exit the function if the CVV validation fails
        }

        // Show a notification upon successful validation and purchase
        showNotification("You have successfully bought the item!");
        form.reset(); // Reset the form fields after successful submission
    });

    // Function to validate the cardholder's name
    function validateCardName(name) {
        // Regular expression to allow only alphabetic characters and spaces
        const regex = /^[A-Za-z\s]+$/;
        
        // Ensure the name is longer than 2 characters
        if(name.length < 3) {
            alert('Name should be longer than 2 characters.');
            return false;
        }
        
        // Ensure the name does not exceed 50 characters
        if(name.length > 50) {
            alert('You can\'t input more than 50 characters for a name.');
            return false;
        }
        
        // Ensure the name matches the regex pattern
        if(!regex.test(name)) {
            alert('Please enter a valid name.');
            return false;
        }
        
        return true; // Return true if all validations pass
    }

    // Function to validate the card number
    function validateCardNumber(number) {
        // Basic regex to check for a 16-digit card number
        const regex = /^\d{16}$/;
        return regex.test(number); // Return true if the card number matches the regex
    }

    // Function to validate the expiry date
    function validateExpiryDate(date) {
        // Regex to match the date format MM/YY
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
    
        // Check if the expiry date is valid (not in the past)
        if (inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth)) {
            return true;
        }
    
        return false; // Return false if the expiry date is invalid
    }

    // Function to validate the CVV
    function validateCVV(cvv) {
        // Regex to match a 3 or 4-digit CVV
        const regex = /^\d{3,4}$/;
        return regex.test(cvv); // Return true if the CVV matches the regex
    }

    // Function to display a notification message
    function showNotification(message) {
        // Create a new div element for the notification
        let notification = document.createElement('div');
        notification.classList.add('notification'); // Add the notification class
        notification.textContent = message; // Set the notification message
      
        document.body.appendChild(notification); // Add the notification to the body
      
        // Remove the notification after 2.5 seconds
        setTimeout(function() {
            notification.remove();
        }, 2500);
        
        // Redirect to the index page after 3 seconds
        setTimeout(function() {
            window.location.href = '/html/home.html';
        }, 3000);
    }
});
