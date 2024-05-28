// JavaScript code to make images appear dynamically
document.addEventListener("DOMContentLoaded", function() {
    // Image details as objects in an array
    const images = [
        { src: "daraobriain.jpg", alt: "Dara Ó Briain", width: 300, height: 200 },
        { src: "Tommy-Tiernan.jpg", alt: "Tommy Tiernan", width: 300, height: 200 },
        { src: "Graham-Norton.jpg", alt: "Graham Norton", width: 300, height: 200 },
        { src: "Aisling-Bea.jpg", alt: "Aisling Bea", width: 300, height: 200 },
        { src: "Ed-Byrne.jpg", alt: "Ed Byrne", width: 300, height: 200 },
        { src: "David-O-Doherty.jpg", alt: "David O'Doherty", width: 300, height: 200 },
        { src: "Ardal-O-Hanlon.jpg", alt: "Ardal O'Hanlon", width: 300, height: 200 }
    ];

    // Get the container where images will be displayed
    const container = document.getElementById('imageContainer');

    // Loop through the images array and create img elements
    images.forEach(image => {
        // Create an img element
        const img = document.createElement('img');
        
        // Set the attributes
        img.src = image.src;
        img.alt = image.alt;
        img.width = image.width;
        img.height = image.height;

        // Append the img element to the container
        container.appendChild(img);
    });
});

