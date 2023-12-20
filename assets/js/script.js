
function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/img/menuaberto.svg";
    }
    else{
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/img/menufechadp.svg";

    }
}
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('carouselTrack');
    const indicatorsContainer = document.getElementById('indicatorsContainer');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    const images = document.querySelectorAll('.carousel-item img');
    const numImages = images.length;

    let imagesPerView = calculateImagesPerView();
    let totalGroups = Math.ceil(numImages / imagesPerView);

    let indicators = createIndicators();
    let currentGroup = 0;

    updateCarousel();

    window.addEventListener('resize', function () {
        imagesPerView = calculateImagesPerView();
        totalGroups = Math.ceil(numImages / imagesPerView);
        indicators.forEach(indicator => indicatorsContainer.removeChild(indicator));
        indicators = createIndicators();
        updateCarousel();
    });

    prevButton.addEventListener('click', function () {
        currentGroup = Math.max(currentGroup - 1, 0);
        updateCarousel();
    });

    nextButton.addEventListener('click', function () {
        currentGroup = (currentGroup + 1) % totalGroups;
        updateCarousel();
    });

    function calculateImagesPerView() {
        const itemWidth = images[0].closest('.carousel-item').offsetWidth;
        const containerWidth = track.offsetWidth;
        return Math.floor(containerWidth / itemWidth);
    }

    function createIndicators() {
        const indicators = [];
        for (let i = 0; i < totalGroups; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.setAttribute('data-group', i);
            indicator.addEventListener('click', handleIndicatorClick);
            indicators.push(indicator);
            indicatorsContainer.appendChild(indicator);
        }
        return indicators;
    }

    function updateCarousel() {
        const groupWidth = track.clientWidth / totalGroups;
        track.style.transform = `translateX(${-currentGroup * groupWidth}px)`;

        if (track.scrollWidth > track.clientWidth) {
            indicatorsContainer.style.display = 'flex';
        } else {
            indicatorsContainer.style.display = 'none';
        }

        indicators.forEach((indicator, i) => {
            if (i === currentGroup) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        prevButton.disabled = currentGroup === 0;
        nextButton.disabled = currentGroup === totalGroups - 1;
    }

    function handleIndicatorClick() {
        const group = parseInt(this.getAttribute('data-group'));
        currentGroup = group;
        updateCarousel();
    }
});
