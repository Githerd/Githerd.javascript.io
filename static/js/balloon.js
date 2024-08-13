document.addEventListener("DOMContentLoaded", function() {
    const balloon = document.querySelector('.balloon');
    
    balloon.addEventListener('click', () => {
        alert("You clicked the balloon!");
    });
});
