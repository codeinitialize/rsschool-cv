document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const menuList = document.getElementById('menu__list');
    const overlay = document.getElementById('overlay');
  

    const toggleMenu = () => {
      menuList.classList.toggle('active');
      burgerMenu.classList.toggle('rotate');
      overlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    };
  

    burgerMenu.addEventListener('click', toggleMenu);
  

    overlay.addEventListener('click', toggleMenu);
  

    document.querySelectorAll('.menu__link').forEach(link => {
      link.addEventListener('click', () => {
        if (menuList.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  });



const animals = [
    { name: 'Charly', image: 'images/pets-charly_6.png' },
    { name: 'Freddie', image: 'images/pets-freddie_8.png' },
    { name: 'Jennifer', image: 'images/pets-jennifer_2.png' },
    { name: 'Woody', image: 'images/pets-woody_3.png' },
    { name: 'Katrine', image: 'images/pets-katrine_1.png' },
    { name: 'Sophia', image: 'images/pets-sophia_4.png' },
    { name: 'Timmy', image: 'images/pets-timmy_5.png' },
    { name: 'Scarlett', image: 'images/pets-scarlet_7.png' },
];

let currentSlide = 0;
let previousSlide = [];
let slides = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateSlide() {
    const slide = [];
    const availableAnimals = animals.filter(animal => !previousSlide.includes(animal));
    const shuffledAnimals = shuffleArray(availableAnimals);
    const numCards = Math.min(shuffledAnimals.length, getNumCards());
    for (let i = 0; i < numCards; i++) {
        slide.push(shuffledAnimals[i]);
    }
    return slide;
}

function getNumCards() {
    const width = window.innerWidth;
    if (width >= 1280) return 3;
    if (width >= 768) return 2;
    return 1;
}

function createSlideElement(slide) {
    const slideElement = document.createElement('div');
    slideElement.classList.add('our_friends__slide');
    slide.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('our_friends__item');
        card.innerHTML = `
            <img class="our_friends__item-img" src="${animal.image}" alt="${animal.name}">
            <h3 class="our_firends__item-name">${animal.name}</h3>
        `;
        card.addEventListener('click', () => openPopup(animal));
        slideElement.appendChild(card);
    });
    return slideElement;
}

function updateSlider() {
    const sliderItems = document.querySelector('.our_friends__items');
    if (sliderItems) {
        sliderItems.innerHTML = '';
        const currentSlideElement = createSlideElement(slides[currentSlide]);
        sliderItems.appendChild(currentSlideElement);
    }
}

function nextSlide() {
    previousSlide = slides[currentSlide];
    currentSlide = (currentSlide + 1) % slides.length;
    if (currentSlide === 0) {
        slides.push(generateSlide());
    }
    updateSlider();
}

function prevSlide() {
    previousSlide = slides[currentSlide];
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    if (currentSlide === slides.length - 1) {
        slides.unshift(generateSlide());
    }
    updateSlider();
}

function initSlider() {
    slides = [generateSlide(), generateSlide(), generateSlide()];
    const slider = document.querySelector('.our_friends__slider');
    const items = document.createElement('div');
    items.classList.add('our_friends__items');
    slider.appendChild(items);
    updateSlider();
}

function openPopup(animal) {
    const popupOverlay = document.getElementById('popupOverlay');
    const popupImage = document.getElementById('popupImage');
    const popupName = document.getElementById('popupName');

    popupImage.src = animal.image;
    popupName.textContent = animal.name;

    popupOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.getElementById('closeBtn').addEventListener('click', closePopup);
document.getElementById('popupOverlay').addEventListener('click', (event) => {
    if (event.target === document.getElementById('popupOverlay')) {
        closePopup();
    }
});

document.querySelector('.our_friends__arrow.left').addEventListener('click', prevSlide);
document.querySelector('.our_friends__arrow.right').addEventListener('click', nextSlide);

window.addEventListener('resize', () => {
    slides = [generateSlide(), generateSlide(), generateSlide()];
    currentSlide = 0;
    previousSlide = [];
    updateSlider();
});

initSlider();

