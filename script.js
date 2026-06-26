// --- Navigation Single Page App Transition ---
function switchPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active-page'));

    // Deactivate all nav styling items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Show selected page
    const targetedPage = document.getElementById(pageId);
    if(targetedPage) {
        targetedPage.classList.add('active-page');
    }

    // Set clicked link highlight
    const clickedLink = document.querySelector(`a[href="#${pageId}"]`);
    if(clickedLink) {
        clickedLink.classList.add('active');
    }

    // Auto-close responsive mobile navbar menu on link selection 
    const nav = document.querySelector('.nav-links');
    if(nav.classList.contains('nav-active')) {
        toggleMenu();
    }
}

// --- Mobile Responsive Navigation Menu Toggle ---
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav-links li');

    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');

    navLinks.forEach((link, index) => {
        if(link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

// --- 4. Interactive Academic Planner Functional Scripts ---
let tasks = [
    { id: 1, text: "Submit COS 106 HTML assignment", completed: false },
    { id: 2, text: "Read Chapter 4 Systems Architecture", completed: true }
];

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');
        if(task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    if(taskInput.value.trim() === "") return;

    const newTask = {
        id: Date.now(),
        text: taskInput.value.trim(),
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// --- 5. Javascript Contact Form Verification Logic ---
function validateContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    const errorBox = document.getElementById('form-errors');
    const successBox = document.getElementById('form-success');
    
    errorBox.style.display = "none";
    successBox.style.display = "none";

    // 1. Ensure no field is empty
    if(!name || !email || !phone || !message) {
        showError("Error: All form input values are strictly required.");
        return;
    }

    // 2. Validate email structure format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        showError("Error: Please provide a valid standard email layout Address.");
        return;
    }

    // 3. Ensure phone layout string contains only digits
    const phoneRegex = /^[0-9]+$/;
    if(!phoneRegex.test(phone)) {
        showError("Error: Phone track must contain only raw numeric digits.");
        return;
    }

    // If completely validated successfully
    successBox.style.display = "block";
    document.getElementById('contact-form').reset();
}

function showError(msg) {
    const errorBox = document.getElementById('form-errors');
    errorBox.innerText = msg;
    errorBox.style.display = "block";
}

// Initial Tasks Build Generation Rule
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});