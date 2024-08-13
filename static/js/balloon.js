document.addEventListener("DOMContentLoaded", function() {
    const balloon = document.querySelector('.balloon');

    if (balloon) { 
        balloon.addEventListener('click', () => {
            alert("You clicked the balloon!");
        });
    } else {
        console.error('Balloon element not found.');
    }
});
