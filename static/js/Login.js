document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        
        if (name && email && password) {
        
            resultDiv.innerHTML = `<p>Thank you for signing up, ${name}!</p>`;
            resultDiv.style.display = 'block';
            form.reset(); 
        } else {
          
            resultDiv.innerHTML = `<p>Please fill in all fields correctly.</p>`;
            resultDiv.style.display = 'block';
        }
    });
});
