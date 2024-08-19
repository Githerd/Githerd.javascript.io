document.addEventListener('DOMContentLoaded', () => {

    // Function to change background color
    function changeBackgroundColor() {
        const colors = [
            "#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFBD33", "#33FFBD",
            "#5733FF", "#FF5733", "#A633FF", "#33A6FF", "#FF3333", "#33FF33",
            "#3333FF", "#FF5733", "#57FF33", "#FF3357", "#FF5733", "#5733FF",
            "#3357FF", "#FF5733", "#33FFBD", "#FF33A6", "#FFBD33", "#33FF57",
            "#5733FF", "#FF7F50", "#6A5ACD", "#20B2AA", "#FFD700", "#DC143C",
            "#8A2BE2", "#FF4500", "#2E8B57", "#FF6347", "#4682B4", "#32CD32",
            "#BA55D3", "#FFD700", "#00FA9A", "#FF1493", "#4169E1", "#FF8C00",
            "#9932CC", "#00CED1", "#FF69B4", "#B22222", "#7FFF00", "#6495ED",
            "#FF4500", "#ADFF2F", "#FFA07A", "#20B2AA", "#9370DB", "#3CB371",
            "#7B68EE", "#00FF7F", "#FF6347", "#4682B4", "#FF4500", "#DA70D6",
            "#87CEEB", "#6A5ACD", "#32CD32", "#FF00FF", "#00FFFF", "#FFA500"
        ];

        const randomIndex = Math.floor(Math.random() * colors.length);
        document.body.style.backgroundColor = colors[randomIndex];
    }

    setInterval(changeBackgroundColor, 3000); // Change every 3 seconds

    class SpinningWheel {
        constructor(canvasId, spinButtonId, resultDisplayId, items) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');
            this.spinButton = document.getElementById(spinButtonId);
            this.resultDisplay = document.getElementById(resultDisplayId);
            this.items = items;
            this.radius = this.canvas.width / 2;
            this.arc = Math.PI / (this.items.length / 2);
            this.startAngle = 0;
            this.spinAngleStart = 10;
            this.spinTime = 0;
            this.spinTimeTotal = 0;

            this.spinButton.addEventListener('click', () => this.startSpin());
            this.drawWheel();
        }

        drawWheel() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.items.length; i++) {
                const angle = i * this.arc;
                this.ctx.beginPath();
                this.ctx.arc(this.radius, this.radius, this.radius, angle, angle + this.arc, false);
                this.ctx.lineTo(this.radius, this.radius);
                this.ctx.fillStyle = this.getColor(i, this.items.length);
                this.ctx.fill();
                this.ctx.save();
                this.ctx.fillStyle = "black";
                this.ctx.font = 'bold 10px Arial';
                this.ctx.translate(
                    this.radius + Math.cos(angle + this.arc / 2) * this.radius * 0.9,
                    this.radius + Math.sin(angle + this.arc / 2) * this.radius * 0.9
                );
                this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
                const text = this.items[i];
                this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
                this.ctx.restore();
            }
            this.drawPointer();
        }

        drawPointer() {
            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width / 2 - 10, 0);
            this.ctx.lineTo(this.canvas.width / 2 + 10, 0);
            this.ctx.lineTo(this.canvas.width / 2, 30);
            this.ctx.fillStyle = "red";
            this.ctx.fill();
        }

        getColor(item, maxitem) {
            const phase = 0;
            const center = 128;
            const width = 127;
            const frequency = Math.PI * 2 / maxitem;

            const red = Math.sin(frequency * item + 2 + phase) * width + center;
            const green = Math.sin(frequency * item + 0 + phase) * width + center;
            const blue = Math.sin(frequency * item + 4 + phase) * width + center;

            return `rgb(${red},${green},${blue})`;
        }

        rotateWheel() {
            this.spinTime += 30;
            if (this.spinTime >= this.spinTimeTotal) {
                this.stopRotateWheel();
                return;
            }
            const spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
            this.startAngle += (spinAngle * Math.PI / 180);
            this.drawRotatedWheel();
            requestAnimationFrame(() => this.rotateWheel());
        }

        stopRotateWheel() {
            const degrees = this.startAngle * 180 / Math.PI + 90;
            const arcd = Math.PI / (this.items.length / 2);
            const index = Math.floor((360 - degrees % 360) / (arcd * 180 / Math.PI));
            this.ctx.save();
            this.ctx.font = 'bold 30px Helvetica, Arial';
            const text = this.items[index];
            this.resultDisplay.innerText = `You landed on: ${text}`;
            this.ctx.restore();
        }

        easeOut(t, b, c, d) {
            const ts = (t /= d) * t;
            const tc = ts * t;
            return b + c * (tc + -3 * ts + 3 * t);
        }

        drawRotatedWheel() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.save();
            this.ctx.translate(this.radius, this.radius);
            this.ctx.rotate(this.startAngle);
            this.ctx.translate(-this.radius, -this.radius);
            this.drawWheel();
            this.ctx.restore();
        }

        startSpin() {
            this.spinAngleStart = Math.random() * 10 + 10;
            this.spinTime = 0;
            this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
            this.rotateWheel();
        }
    }

    class TaskManager {
        constructor(taskListId, wheel) {
            this.taskList = document.getElementById(taskListId);
            this.wheel = wheel;
            this.taskList.addEventListener('click', (event) => this.handleTaskClick(event));
        }

        handleTaskClick(event) {
            if (event.target.classList.contains('delete-btn')) {
                const listItem = event.target.closest('li');
                const label = listItem.querySelector('label');
                label.style.textDecoration = 'line-through';
                listItem.classList.add('checked');
                setTimeout(() => {
                    listItem.remove();
                    this.updateComedyClubs();
                }, 500);
            }
        }

        updateComedyClubs() {
            this.wheel.items.length = 0;
            const tasks = this.taskList.querySelectorAll('li label');
            tasks.forEach(task => {
                this.wheel.items.push(task.textContent.trim());
            });
            this.wheel.drawWheel();
        }
    }

    class ImageModalGallery {
        constructor(imageContainerId, modalId, videoFrameId, prevBtnId, nextBtnId, closeBtnClass, images) {
            this.container = document.getElementById(imageContainerId);
            this.modal = document.getElementById(modalId);
            this.videoFrame = document.getElementById(videoFrameId);
            this.prevBtn = document.getElementById(prevBtnId);
            this.nextBtn = document.getElementById(nextBtnId);
            this.closeBtn = document.querySelector(closeBtnClass);
            this.images = images;
            this.currentIndex = 0;

            this.renderImages();
            this.addEventListeners();
        }

        renderImages() {
            this.images.forEach((image, index) => {
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
                this.container.appendChild(flipCard);
            });
        }

        addEventListeners() {
            this.container.addEventListener('click', (event) => this.handleImageClick(event));
            this.closeBtn.addEventListener('click', () => this.closeModal());
            window.addEventListener('click', (event) => {
                if (event.target === this.modal) this.closeModal();
            });
            this.prevBtn.addEventListener('click', () => this.showPrevImage());
            this.nextBtn.addEventListener('click', () => this.showNextImage());
        }

        handleImageClick(event) {
            if (event.target.tagName === 'IMG' || event.target.classList.contains('flip-card-back')) {
                this.currentIndex = parseInt(event.target.closest('.flip-card').dataset.index, 10);
                this.openModal(this.images[this.currentIndex].video);
            }
        }

        openModal(videoUrl) {
            this.videoFrame.src = videoUrl;
            this.modal.style.display = 'block';
        }

        closeModal() {
            this.modal.style.display = 'none';
            this.videoFrame.src = '';
        }

        showPrevImage() {
            this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
            this.openModal(this.images[this.currentIndex].video);
        }

        showNextImage() {
            this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
            this.openModal(this.images[this.currentIndex].video);
        }
    }

    class FormValidator {
        constructor(formId, resultDivId) {
            this.form = document.getElementById(formId);
            this.resultDiv = document.getElementById(resultDivId);

            this.form.addEventListener('submit', (event) => this.handleSubmit(event));
        }

        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        isValidPassword(password) {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
            return passwordRegex.test(password);
        }

        handleSubmit(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (name && this.isValidEmail(email) && this.isValidPassword(password)) {
                this.resultDiv.innerHTML = `<p>Thank you for signing up, ${name}!</p>`;
                this.resultDiv.style.display = 'block';
                this.form.reset();
            } else {
                let errorMessage = 'Please fill in all fields correctly.';
                if (!this.isValidEmail(email)) {
                    errorMessage += '<br>Email format is invalid.';
                }
                if (!this.isValidPassword(password)) {
                    errorMessage += '<br>Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
                }
                this.resultDiv.innerHTML = `<p>${errorMessage}</p>`;
                this.resultDiv.style.display = 'block';
            }
        }
    }

    class AuthManager {
        constructor(loginLinkId, registerLinkId, logoutLinkId, userLoggedIn) {
            this.loginLink = document.getElementById(loginLinkId);
            this.registerLink = document.getElementById(registerLinkId);
            this.logoutLink = document.getElementById(logoutLinkId);
            this.userLoggedIn = userLoggedIn;

            this.updateAuthState();
        }

        updateAuthState() {
            if (this.userLoggedIn) {
                this.loginLink.style.display = 'none';
                this.registerLink.style.display = 'none';
                this.logoutLink.style.display = 'inline-block';
            } else {
                this.loginLink.style.display = 'inline-block';
                this.registerLink.style.display = 'inline-block';
                this.logoutLink.style.display = 'none';
            }
        }
    }

    // Initialization
    const comedyClubs = [
        "The Comedy Cellar", "The Laughter Lounge", "The International Comedy Club",
        "The Empire Comedy Club", "The Roisin Dubh Comedy Club", "The Bankers Comedy Club",
        "Cherry Comedy", "The Comedy Crunch", "The Empire Laughs Back", "Anseo Comedy Club"
    ];

    const wheel = new SpinningWheel('wheelCanvas', 'spinButton', 'result', comedyClubs);
    new TaskManager('taskList', wheel);

    const images = [
        { src: "daraobriain.jpg", alt: "Dara Ó Briain", video: "https://www.youtube.com/embed/Gz7OzGpSRnw", bio: "Dara Ó Briain is an Irish comedian and television presenter, known for his witty humor and sharp intellect." },
        { src: "Tommy-Tiernan.jpg", alt: "Tommy Tiernan", video: "https://www.youtube.com/embed/8fKVPtn-szk", bio: "Tommy Tiernan is an Irish comedian, actor, and writer, celebrated for his unique storytelling style." },
        { src: "Graham Norton.jpg", alt: "Graham Norton", video: "https://www.youtube.com/embed/1U-amrqqCKw", bio: "Graham Norton is an Irish television and radio presenter, known for his popular talk show." },
        { src: "Aisling Bea.jpg", alt: "Aisling Bea", video: "https://www.youtube.com/watch?v=DAiIUbSt-eM", bio: "Aisling Bea is an Irish comedian, actress, and writer, known for her sharp humor and acting skills." },
        { src: "David O'Doherty.jpg", alt: "David O'Doherty", video: "https://www.youtube.com/watch?v=TRHS0pN6oC0", bio: "David O'Doherty is an Irish comedian, author, musician, actor, and playwright, recognized for his musical comedy." },
        { src: "Ardal O'Hanlon.jpg", alt: "Ardal O'Hanlon", video: "https://www.youtube.com/watch?v=6B--cjte5P4", bio: "Ardal O'Hanlon is an Irish comedian and actor, best known for his role in the sitcom Father Ted." },
        { src: "Ed Byrne.jpg", alt: "Ed Byrne", video: "https://www.youtube.com/watch?v=8gxb4e6gInU", bio: "Ed Byrne is a comedian and actor known for his observational humor." }
    ];

    new ImageModalGallery('imageContainer', 'videoModal', 'videoFrame', 'prevBtn', 'nextBtn', '.modal .close', images);
    new FormValidator('myForm', 'result');

    const userLoggedIn = true;
    new AuthManager('login-link', 'register-link', 'logout-link', userLoggedIn);

});

 // Form Submission Balloon Animation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.textContent = '🎈';
            document.body.appendChild(balloon);

            const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
            const rect = submitButton.getBoundingClientRect();
            balloon.style.left = `${rect.left + window.scrollX}px`;
            balloon.style.top = `${rect.top + window.scrollY}px`;

            setTimeout(() => {
                balloon.remove();
            }, 5000);
        });
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        backToTopBtn.style.position = "fixed";
        backToTopBtn.style.bottom = "20px";
        backToTopBtn.style.left = "20px";  // Adjusting to the left

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });
    }

    // Show or hide the back-to-top button on load
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }
});

// Flip Effects Initialization Function
function initializeFlipEffects() {
    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        container.addEventListener('click', () => {
            container.classList.toggle('flip');
        });
    });
}
