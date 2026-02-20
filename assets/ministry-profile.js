// Rotate ministry profile sections with navigation
function rotateMinistryProfile() {
    const container = document.getElementById('ministry-profile-container');
    if (!container) return;

    const items = container.querySelectorAll('.ministry-profile-item');
    if (items.length === 0) return;

    const prevBtn = container.querySelector('.profile-nav-btn.prev');
    const nextBtn = container.querySelector('.profile-nav-btn.next');

    let currentIndex = 0;
    let autoRotateInterval;

    function showItem(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(showNext, 30000);
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showNext();
            resetAutoRotate();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showPrev();
            resetAutoRotate();
        });
    }

    startAutoRotate();
}
