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
