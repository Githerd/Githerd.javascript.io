document.addEventListener("DOMContentLoaded", function() {
    const images = [
        { src: "daraobriain.jpg", alt: "Dara Ó Briain", video: "https://www.youtube.com/watch?v=Gz7OzGpSRnw" },
        { src: "Tommy-Tiernan.jpg", alt: "Tommy Tiernan", video: "https://www.youtube.com/watch?v=8fKVPtn-szk" },
        { src: "Graham-Norton.jpg", alt: "Graham Norton", video: "https://www.youtube.com/watch?v=1U-amrqqCKw" },
        { src: "Aisling-Bea.jpg", alt: "Aisling Bea", video: "https://www.youtube.com/watch?v=YLU6m1D_uWs" },
        { src: "Ed-Byrne.jpg", alt: "Ed Byrne", video: "https://www.youtube.com/watch?v=Doz9BpXMUXI" },
        { src: "David-O-Doherty.jpg", alt: "David O'Doherty", video: "https://www.youtube.com/watch?v=3YI7VIwLmCM?si=XLbcZ6CiwasANUBT" },
        { src: "Ardal-O-Hanlon.jpg", alt: "Ardal O'Hanlon", video: "https://www.youtube.com/watch?v=H8-AZ5ri6H8" }
    ];

    let currentIndex = 0;

    const container = document.getElementById('imageContainer');
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.modal .close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.width = 300;
        img.height = 200;
        img.dataset.index = index;
        container.appendChild(img);
    });

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            currentIndex = parseInt(event.target.dataset.index, 10);
            openModal();
        }
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);

    function openModal() {
        videoFrame.src = images[currentIndex].video;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        videoFrame.src = '';
    }

    function showPrevious() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        videoFrame.src = images[currentIndex].video;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        videoFrame.src = images[currentIndex].video;
    }
});
