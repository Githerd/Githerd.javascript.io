document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting the default way

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation
        if (name && email && password) {
            // Display success message
            resultDiv.innerHTML = `<p>Thank you for signing up, ${name}!</p>`;
            resultDiv.style.display = 'block';
        } else {
            // Display error message
            resultDiv.innerHTML = `<p>Please fill in all fields correctly.</p>`;
            resultDiv.style.display = 'block';
        }
    });
});
