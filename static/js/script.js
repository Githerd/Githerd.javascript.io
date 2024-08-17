document.addEventListener('DOMContentLoaded', () => {

    const comedyClubs = [
        "The Comedy Cellar", "The Laughter Lounge", "The International Comedy Club",
        "The Empire Comedy Club", "The Roisin Dubh Comedy Club", "The Bankers Comedy Club",
        "Cherry Comedy", "The Comedy Crunch", "The Empire Laughs Back", "Anseo Comedy Club"
    ];

    // Wheel of Fortune Section
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinButton');
    const resultDisplay = document.getElementById('result');
    const radius = canvas.width / 2;
    const arc = Math.PI / (comedyClubs.length / 2);
    let spinAngleStart = 10;
    let spinTime = 0;
    let spinTimeTotal = 0;
    let startAngle = 0;

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < comedyClubs.length; i++) {
            const angle = i * arc;
            ctx.beginPath();
            ctx.arc(radius, radius, radius, angle, angle + arc, false);
            ctx.lineTo(radius, radius);
            ctx.fillStyle = getColor(i, comedyClubs.length);
            ctx.fill();
            ctx.save();
            ctx.fillStyle = "black";
            ctx.font = 'bold 10px Arial';
            ctx.translate(
                radius + Math.cos(angle + arc / 2) * radius * 0.9,
                radius + Math.sin(angle + arc / 2) * radius * 0.9
            );
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = comedyClubs[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
        drawPointer();
    }

    function drawPointer() {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 10, 0);
        ctx.lineTo(canvas.width / 2 + 10, 0);
        ctx.lineTo(canvas.width / 2, 30);
        ctx.fillStyle = "red";
        ctx.fill();
    }

    function getColor(item, maxitem) {
        const phase = 0;
        const center = 128;
        const width = 127;
        const frequency = Math.PI * 2 / maxitem;
        const red = Math.sin(frequency * item + 2 + phase) * width + center;
        const green = Math.sin(frequency * item + 0 + phase) * width + center;
        const blue = Math.sin(frequency * item + 4 + phase) * width + center;
        return `rgb(${red},${green},${blue})`;
    }

    function rotateWheel() {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawRotatedWheel();
        requestAnimationFrame(rotateWheel);
    }

    function stopRotateWheel() {
        const degrees = startAngle * 180 / Math.PI + 90;
        const arcd = arc * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        ctx.save();
        ctx.font = 'bold 30px Helvetica, Arial';
        const text = comedyClubs[index];
        resultDisplay.innerText = `You landed on: ${text}`;
        ctx.restore();
    }

    function easeOut(t, b, c, d) {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    function drawRotatedWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(startAngle);
        ctx.translate(-radius, -radius);
        drawWheel();
        ctx.restore();
    }

    spinButton.addEventListener('click', () => {
        spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3 + 4 * 1000;
        rotateWheel();
    });

    drawWheel();

    // Task List Section
    const taskList = document.getElementById('taskList');
    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const listItem = event.target.closest('li');
            const label = listItem.querySelector('label');
            label.style.textDecoration = 'line-through';
            listItem.classList.add('checked');
            setTimeout(() => {
                listItem.remove();
                updateComedyClubs();
            }, 500);
        }
    });

    function updateComedyClubs() {
        comedyClubs.length = 0;
        const tasks = taskList.querySelectorAll('li label');
        tasks.forEach(task => {
            comedyClubs.push(task.textContent.trim());
        });
        drawWheel();
    }

    updateComedyClubs();

    // Comedian Profile Flip Cards
    const images = [
        { src: "daraobriain.jpg", alt: "Dara Ó Briain", video: "https://www.youtube.com/embed/Gz7OzGpSRnw", bio: "Dara Ó Briain is an Irish comedian and television presenter, known for his witty humor and sharp intellect." },
        { src: "Tommy-Tiernan.jpg", alt: "Tommy Tiernan", video: "https://www.youtube.com/embed/8fKVPtn-szk", bio: "Tommy Tiernan is an Irish comedian, actor, and writer, celebrated for his unique storytelling style." },
        { src: "Graham Norton", alt: "Graham Norton", video: "https://www.youtube.com/embed/1U-amrqqCKw", bio: "Graham Norton is an Irish television and radio presenter, known for his popular talk show." },
        { src: "Aisling-Bea.jpg", alt: "Aisling Bea", video: "https://www.youtube.com/watch?v=DAiIUbSt-eM", bio: "Aisling Bea is an Irish comedian, actress, and writer, known for her sharp humor and acting skills." },
        { src: "David-O-Doherty.jpg", alt: "David O'Doherty", video: "https://www.youtube.com/watch?v=TRHS0pN6oC0", bio: "David O'Doherty is an Irish comedian, author, musician, actor, and playwright, recognized for his musical comedy." },
        { src: "Ardal-O-Hanlon.jpg", alt: "Ardal O'Hanlon", video: "https://www.youtube.com/watch?v=6B--cjte5P4", bio: "Ardal O'Hanlon is an Irish comedian and actor, best known for his role in the sitcom Father Ted." },
        { src: "Ed-Byrne.jpg", alt: "Ed Byrne", video: "https://www.youtube.com/watch?v=8gxb4e6gInU", bio: "Ed Byrne is a comedian and actor known for his observational humor." }
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
            openModal(images[currentIndex].video);
        }
    });

    function openModal(videoUrl) {
        videoFrame.src = videoUrl;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        videoFrame.src = '';
    }

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        openModal(images[currentIndex].video);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        openModal(images[currentIndex].video);
    });

    // Form Validation and Submission
    const form = document.getElementById('myForm');
    const resultDiv = document.getElementById('result');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return passwordRegex.test(password);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (name && isValidEmail(email) && isValidPassword(password)) {
            resultDiv.innerHTML = `<p>Thank you for signing up, ${name}!</p>`;
            resultDiv.style.display = 'block';
            form.reset();
        } else {
            let errorMessage = 'Please fill in all fields correctly.';
            if (!isValidEmail(email)) {
                errorMessage += '<br>Email format is invalid.';
            }
            if (!isValidPassword(password)) {
                errorMessage += '<br>Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
            }
            resultDiv.innerHTML = `<p>${errorMessage}</p>`;
            resultDiv.style.display = 'block';
        }
    });

    // Conditional Display of Login/Logout Links
    const balloonForm = document.getElementById('balloon-form');
    const confirmationMessage = document.getElementById('confirmation');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');

    const userLoggedIn = true;

    if (userLoggedIn) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'inline-block';
    } else {
        loginLink.style.display = 'inline-block';
        registerLink.style.display = 'inline-block';
        logoutLink.style.display = 'none';
    }

    balloonForm.addEventListener('submit', function(event) {
        event.preventDefault();
        confirmationMessage.textContent = 'Your message has been sent!';
        confirmationMessage.style.display = 'block';
        balloonForm.reset();
    });
});
