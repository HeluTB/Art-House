// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const contacts = [
        {
            name: 'Kaleb Seyoum',
            profilePicture: 'https://via.placeholder.com/100',
            links: {
                github: 'https://github.com/Kaleb00-00',
                telegram: 'https://t.me/myusername',
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
            profilePicture: 'https://via.placeholder.com/100',
            links: {
                github: 'https://github.com/kidus-yoseph-t',
                telegram: 'https://t.me/Kidusy1',
                email: ''
            }
        },
        {
            name: 'Tsion Fikru',
            profilePicture: 'https://via.placeholder.com/100',
            links: {
                github: 'https://github.com/tseon-designs',
                telegram: 'https://t.me/zeee27',
                email:'tsiitisi9@gmail.com'
            }
        },
        {
            name: 'Mikyas Demelash',
            profilePicture: 'https://via.placeholder.com/100',
            links: {
                github: 'https://github.com/MikyasD',
                telegram: 'https://t.me/Mylifeasabruhmoment',
                email: 'githubmikias0116@gmail.com'
            }
        },
    ];

    const contactContainer = document.getElementById('contact-container');

    contacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');

        contactCard.innerHTML = `
            <img src="${contact.profilePicture}" alt="${contact.name}">
            <h2>${contact.name}</h2>
            <p>
                <a href="${contact.links.github}" target="_blank">GitHub</a> | 
                <a href="${contact.links.telegram}" target="_blank">Telegram</a>|
                <a href="mailto:${contact.links.email}" target="_blank">Email</a>
            </p>
        `;

        contactContainer.appendChild(contactCard);
    });
});
