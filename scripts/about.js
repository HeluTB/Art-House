// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {

    // Define an array of contact objects, each containing name, profile picture, and contact links
    const contacts = [
        {
            name: 'Kaleb Seyoum', // Contact name
            profilePicture: '/images/kaleb.png', // URL to profile picture
            links: { // Links to contact's social profiles
                github: 'https://github.com/Kaleb00-00',
                email: 'Kalebseyoum099@gmail.com'
            }
        },
        {
            name: 'Helen Tewoldebirhan',
            profilePicture: '/images/Helen.png',
            links: {
                github: 'https://github.com/HeluTB',
                telegram: 'https://t.me/Haulalala',
                email: 'helutb@gmail.com'
            }
        },
        {
            name: 'Kidus Yoseph',
            profilePicture: 'https://via.placeholder.com/100', // Placeholder image used here
            links: {
                github: 'https://github.com/kidus-yoseph-t',
                telegram: 'https://t.me/Kidusy1',
                email: '' // Email link left empty
            }
        },
        {
            name: 'Tsion Fikru',
            profilePicture: '/images/Tseon.jpg', // Placeholder image used here
            links: {
                github: 'https://github.com/tseon-designs',
                telegram: 'https://t.me/zeee27',
                email: 'tsiitisi9@gmail.com'
            }
        },
        {
            name: 'Mikyas Demelash',
            profilePicture: 'https://via.placeholder.com/100', // Placeholder image used here
            links: {
                github: 'https://github.com/MikyasD',
                telegram: 'https://t.me/Mylifeasabruhmoment',
                email: 'githubmikias0116@gmail.com'
            }
        },
    ];

    // Get the container element where contact cards will be appended
    const contactContainer = document.getElementById('contact-container');

    // Loop through each contact in the contacts array
    contacts.forEach(contact => {
        // Create a new div element to represent the contact card
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card'); // Add 'contact-card' class to the div

        // Set the inner HTML of the contact card with contact details and links
        contactCard.innerHTML = `
            <img src="${contact.profilePicture}" alt="${contact.name}" style="object-fit: cover;"> <!-- Profile picture -->
            <h2>${contact.name}</h2> <!-- Contact name -->
            <p>
                <a href="${contact.links.github}" target="_blank">GitHub</a> | <!-- GitHub link -->
                <a href="${contact.links.telegram}" target="_blank">Telegram</a> | <!-- Telegram link -->
                <a href="mailto:${contact.links.email}" target="_blank">Email</a> <!-- Email link -->
            </p>
        `;

        // Append the contact card to the contact container
        contactContainer.appendChild(contactCard);
    });
});
