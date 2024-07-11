document.querySelectorAll('.carousel-container').forEach(container => {
    const leftBtn = container.querySelector('.left-btn');
    const rightBtn = container.querySelector('.right-btn');
    const carousel = container.querySelector('.book-carousel');

    leftBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -220, // Adjusted to match the width and gap of the book items
            behavior: 'smooth'
        });
    });

    rightBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: 220, // Adjusted to match the width and gap of the book items
            behavior: 'smooth'
        });
    });
});
