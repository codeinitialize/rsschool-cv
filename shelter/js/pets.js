document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const menuList = document.getElementById('menu__list');

    burgerMenu.addEventListener('click', () => {
        menuList.classList.toggle('active');
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

    let currentPage = 1;
    let totalPages = 0;
    let petsArray = [];
    let petsPerPage = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generatePetsArray() {
        const tempArray = [];
        for (let i = 0; i < 6; i++) {
            tempArray.push(...animals);
        }
        shuffleArray(tempArray);
        return tempArray;
    }

    function renderPets(page) {
        const container = document.getElementById('pets-container');
        container.innerHTML = '';

        const start = (page - 1) * petsPerPage;
        const end = start + petsPerPage;
        const pagePets = petsArray.slice(start, end);

        pagePets.forEach(pet => {
            const card = document.createElement('div');
            card.className = 'our_friends__item';
            card.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}" class="our_friends__item-img">
                <p class="our_friends__item-name">${pet.name}</p>
                <button class="our_friends__item-btn">Learn more</button>
            `;
            
            // Добавляем обработчик клика на всю карточку
            card.addEventListener('click', () => openPopup(pet));

            container.appendChild(card);
        });
    }

    function updatePaginationButtons() {
        const firstPageBtn = document.getElementById('first-page');
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');
        const lastPageBtn = document.getElementById('last-page');
        const currentPageSpan = document.getElementById('current-page');

        firstPageBtn.disabled = currentPage === 1;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        lastPageBtn.disabled = currentPage === totalPages;

        currentPageSpan.textContent = currentPage;
    }

    function handleResize() {
        const width = window.innerWidth;

        if (width >= 1280) {
            petsPerPage = 8;
        } else if (width >= 768) {
            petsPerPage = 6;
        } else {
            petsPerPage = 3;
        }

        totalPages = Math.ceil(petsArray.length / petsPerPage);
        updatePaginationButtons();
        renderPets(currentPage);
    }

    function init() {
        petsArray = generatePetsArray();
        handleResize();

        document.getElementById('first-page').addEventListener('click', () => {
            currentPage = 1;
            renderPets(currentPage);
            updatePaginationButtons();
        });

        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPets(currentPage);
                updatePaginationButtons();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPets(currentPage);
                updatePaginationButtons();
            }
        });

        document.getElementById('last-page').addEventListener('click', () => {
            currentPage = totalPages;
            renderPets(currentPage);
            updatePaginationButtons();
        });

        window.addEventListener('resize', handleResize);
    }

    function openPopup(animal) {
        const popupOverlay = document.getElementById('popupOverlay');
        const popupImage = document.getElementById('popupImage');
        const popupName = document.getElementById('popupName');
        
        popupImage.src = animal.image;
        popupName.textContent = animal.name;
        
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        const popupOverlay = document.getElementById('popupOverlay');
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    document.getElementById('closeBtn').addEventListener('click', closePopup);
    document.getElementById('popupOverlay').addEventListener('click', (event) => {
        if (event.target === document.getElementById('popupOverlay')) {
            closePopup();
        }
    });

    init();
});







