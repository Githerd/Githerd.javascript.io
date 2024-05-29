document.addEventListener("DOMContentLoaded", function() {
    const images = [
        { src: "daraobriain.jpg", alt: "Dara Ó Briain", video: "https://www.youtube.com/embed/VIDEO_ID1" },
        { src: "Tommy-Tiernan.jpg", alt: "Tommy Tiernan", video: "https://www.youtube.com/embed/VIDEO_ID2" },
        { src: "Graham-Norton.jpg", alt: "Graham Norton", video: "https://www.youtube.com/embed/VIDEO_ID3" },
        { src: "Aisling-Bea.jpg", alt: "Aisling Bea", video: "https://www.youtube.com/embed/VIDEO_ID4" },
        { src: "Ed-Byrne.jpg", alt: "Ed Byrne", video: "https://www.youtube.com/embed/VIDEO_ID5" },
        { src: "David-O-Doherty.jpg", alt: "David O'Doherty", video: "https://www.youtube.com/embed/VIDEO_ID6" },
        { src: "Ardal-O-Hanlon.jpg", alt: "Ardal O'Hanlon", video: "https://www.youtube.com/embed/VIDEO_ID7" }
    ];

    const container = document.getElementById('imageContainer');
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.modal .close');

    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.width = 300;
        img.height = 200;
        img.dataset.video = image.video;
        container.appendChild(img);
    });

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            const videoUrl = event.target.dataset.video;
            videoFrame.src = videoUrl;
            modal.style.display = 'block';
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        videoFrame.src = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            videoFrame.src = '';
        }
    });
});
