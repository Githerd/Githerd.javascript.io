const comedyClubs = [
    "The Comedy Cellar",
    "The Laughter Lounge",
    "The International Comedy Club",
    "The Empire Comedy Club",
    "The Roisin Dubh Comedy Club",
    "The Bankers Comedy Club",
    "Cherry Comedy",
    "The Comedy Crunch",
    "The Empire Laughs Back",
    "Anseo Comedy Club"
];

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
let spinTimeout;

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
        ctx.translate(radius + Math.cos(angle + arc / 2) * radius * 0.9,
            radius + Math.sin(angle + arc / 2) * radius * 0.9);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const text = comedyClubs[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
    }
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
    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
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

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');

    taskList.addEventListener('change', (event) => {
        if (event.target.classList.contains('task-checkbox')) {
            const listItem = event.target.closest('li');
            listItem.classList.toggle('checked', event.target.checked);
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const listItem = event.target.closest('li');
            listItem.remove();
        }
    });
});
