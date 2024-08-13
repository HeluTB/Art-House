document.addEventListener('DOMContentLoaded', () => {
    // Add any interactive features here
    // For example, a modal for viewing larger images
    const artItems = document.querySelectorAll('.art-item img');

    artItems.forEach(item => {
        item.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${item.src}" alt="${item.alt}">
                </div>
            `;
            document.body.appendChild(modal);
            const closeModal = modal.querySelector('.close');
            closeModal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
    });
});
