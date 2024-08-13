document.addEventListener("DOMContentLoaded", function() {
    const images = [
        { src: "daraobriain.jpg", alt: "Dara Ó Briain", video: "https://www.youtube.com/embed/Gz7OzGpSRnw", bio: "Dara Ó Briain is an Irish comedian and television presenter, known for his witty humor and sharp intellect." },
        { src: "Tommy-Tiernan.jpg", alt: "Tommy Tiernan", video: "https://www.youtube.com/embed/8fKVPtn-szk", bio: "Tommy Tiernan is an Irish comedian, actor, and writer, celebrated for his unique storytelling style." },
        { src: "Graham-Norton.jpg", alt: "Graham Norton", video: "https://www.youtube.com/embed/1U-amrqqCKw", bio: "Graham Norton is an Irish television and radio presenter, known for his popular talk show." },
        { src: "Aisling-Bea.jpg", alt: "Aisling Bea", video: "https://www.youtube.com/embed/YLU6m1D_uWs", bio: "Aisling Bea is an Irish comedian, actress, and writer, known for her sharp humor and acting skills." },
        { src: "David-O-Doherty.jpg", alt: "David O'Doherty", video: "https://www.youtube.com/embed/3YI7VIwLmCM", bio: "David O'Doherty is an Irish comedian, author, musician, actor, and playwright, recognized for his musical comedy." },
        { src: "Ardal-O-Hanlon.jpg", alt: "Ardal O'Hanlon", video: "https://www.youtube.com/embed/H8-AZ5ri6H8", bio: "Ardal O'Hanlon is an Irish comedian and actor, best known for his role in the sitcom Father Ted." },
        { src: "Ed-Byrne.jpg", alt: "Ed Byrne", video: "https://www.youtube.com/watch?v=Doz9BpXMUXI", bio: "Ed Byrne is a comedian and actor known for his observational humor." }
    ];

    let currentIndex = 0;
    const container = document.getElementById('imageContainer');
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.modal .close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    images.forEach((image, index) => {
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        flipCard.dataset.index = index;

        const flipCardInner = document.createElement('div');
        flipCardInner.className = 'flip-card-inner';

        const flipCardFront = document.createElement('div');
        flipCardFront.className = 'flip-card-front';
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.width = 300;
        img.height = 200;
        flipCardFront.appendChild(img);

        const flipCardBack = document.createElement('div');
        flipCardBack.className = 'flip-card-back';
        const bio = document.createElement('p');
        bio.textContent = image.bio;
        flipCardBack.appendChild(bio);

        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        container.appendChild(flipCard);
    });

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG' || event.target.classList.contains('flip-card-back')) {
            currentIndex = parseInt(event.target.closest('.flip-card').dataset.index, 10);
            openModal();
        }
    });

    function openModal() {
        videoFrame.src = images[currentIndex].video;
        modal.style.display = 'block';
    }

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        videoFrame.src = '';
    });

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        openModal();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        openModal();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            videoFrame.src = '';
        }
    });
});
