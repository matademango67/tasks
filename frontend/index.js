// ============ CONSTANTS ============
const API_URL = "http://localhost:3000";
const ACCESS_TOKEN_KEY = "accessToken";

// ============ DOM ELEMENTS - REGISTER ============
const registerSection = document.getElementById("register-section");
const registerForm = document.getElementById("register-form");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");
const registerConfirmPasswordInput = document.getElementById("register-confirm-password");
const registerError = document.getElementById("register-error");
const toLoginLink = document.getElementById("to-login-link");

// ============ DOM ELEMENTS - LOGIN ============
const loginSection = document.getElementById("login-section");
const loginForm = document.getElementById("login-form");
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginError = document.getElementById("login-error");
const toRegisterLink = document.getElementById("to-register-link");

// ============ DOM ELEMENTS - TASKS ============
const tasksSection = document.getElementById("tasks-section");
const logoutBtn = document.querySelector(".btn-logout");
const createBtn = document.querySelector(".btn-create");
const updateBtn = document.querySelector(".btn-update");
const deleteBtn = document.querySelector(".btn-delete");
const taskList = document.getElementById("task-list");

// ============ AUTHENTICATION FLOW FUNCTIONS ============

/**
 * Check if user is already logged in (has accessToken in localStorage)
 * If logged in, show tasks section; otherwise show register section
 */
function checkAuthStatus() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    
    if (accessToken) {
        showTasksSection();
        showTasks();
    } else {
        showRegisterSection();
    }
}

/**
 * Show the register section and hide others
 */
function showRegisterSection() {
    registerSection.classList.add("section-active");
    registerSection.classList.remove("section-hidden");
    
    loginSection.classList.add("section-hidden");
    loginSection.classList.remove("section-active");
    
    tasksSection.classList.add("section-hidden");
    tasksSection.classList.remove("section-active");
}

/**
 * Show the login section and hide others
 */
function showLoginSection() {
    loginSection.classList.add("section-active");
    loginSection.classList.remove("section-hidden");
    
    registerSection.classList.add("section-hidden");
    registerSection.classList.remove("section-active");
    
    tasksSection.classList.add("section-hidden");
    tasksSection.classList.remove("section-active");
}

/**
 * Show the tasks section and hide auth sections
 */
function showTasksSection() {
    tasksSection.classList.add("section-active");
    tasksSection.classList.remove("section-hidden");
    
    registerSection.classList.add("section-hidden");
    registerSection.classList.remove("section-active");
    
    loginSection.classList.add("section-hidden");
    loginSection.classList.remove("section-active");
}

/**
 * Validate email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} True if email format is valid
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Clear error message from register form
 */
function clearRegisterError() {
    registerError.textContent = "";
}

/**
 * Display error message on register form
 * @param {string} message - Error message to display
 */
function showRegisterError(message) {
    registerError.textContent = message;
}

/**
 * Clear error message from login form
 */
function clearLoginError() {
    loginError.textContent = "";
}

/**
 * Display error message on login form
 * @param {string} message - Error message to display
 */
function showLoginError(message) {
    loginError.textContent = message;
}

/**
 * Handle register form submission
 * Validates input, sends register request, and handles response
 */
async function handleRegister(e) {
    e.preventDefault();
    clearRegisterError();

    const email = registerEmailInput.value.trim();
    const password = registerPasswordInput.value.trim();
    const confirmPassword = registerConfirmPasswordInput.value.trim();

    // CLIENT-SIDE VALIDATION

    // Check if email is provided
    if (!email) {
        showRegisterError("Email is required");
        return;
    }

    // Check if email format is valid
    if (!validateEmail(email)) {
        showRegisterError("Please enter a valid email address");
        return;
    }

    // Check if password is provided
    if (!password) {
        showRegisterError("Password is required");
        return;
    }

    // Check if password is at least 6 characters
    if (password.length < 6) {
        showRegisterError("Password must be at least 6 characters");
        return;
    }

    // Check if password confirmation is provided
    if (!confirmPassword) {
        showRegisterError("Please confirm your password");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        showRegisterError("Passwords do not match");
        return;
    }

    try {
        // Send POST request to /auth/register
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        // Handle register success (status 201)
        if (response.ok) {
            // Clear form inputs
            registerForm.reset();
            
            // Show login section
            showLoginSection();
        } 
        // Handle register failure
        else {
            showRegisterError(data.message || "Registration failed. Try again.");
        }
    } catch (error) {
        console.error("Register error:", error);
        showRegisterError("Connection error. Please try again.");
    }
}

/**
 * Handle login form submission
 * Validates input, sends login request, and handles response
 */
async function handleLogin(e) {
    e.preventDefault();
    clearLoginError();

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();

    // CLIENT-SIDE VALIDATION

    // Check if email is provided
    if (!email) {
        showLoginError("Email is required");
        return;
    }

    // Check if email format is valid
    if (!validateEmail(email)) {
        showLoginError("Please enter a valid email address");
        return;
    }

    // Check if password is provided
    if (!password) {
        showLoginError("Password is required");
        return;
    }

    // Check if password is at least 6 characters
    if (password.length < 6) {
        showLoginError("Password must be at least 6 characters");
        return;
    }

    try {
        // Send POST request to /auth/login
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // Include cookies in request (for refreshToken)
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        // Handle login success (status 200)
        if (response.ok) {
            // Save accessToken in localStorage
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            
            // Clear form inputs
            loginForm.reset();
            
            // Show tasks section and load tasks
            showTasksSection();
            showTasks();
        } 
        // Handle login failure
        else {
            showLoginError(data.message || "Invalid email or password");
        }
    } catch (error) {
        console.error("Login error:", error);
        showLoginError("Connection error. Please try again.");
    }
}

/**
 * Handle logout
 * Clears accessToken and redirects to register
 */
async function handleLogout() {
    try {
        // Send DELETE request to /auth/logout
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "DELETE",
            credentials: "include" // Include cookies (refreshToken)
        });

        // Whether successful or not, clear local token and redirect to register
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        showRegisterSection();
        registerForm.reset();
        loginForm.reset();
        clearRegisterError();
        clearLoginError();

        // Log result for debugging
        if (response.ok || response.status === 204) {
            console.log("Logged out successfully");
        }
    } catch (error) {
        console.error("Logout error:", error);
        // Still clear local token on error
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        showRegisterSection();
    }
}

// ============ TASK MANAGEMENT FUNCTIONS (EXISTING) ============

/**
 * Fetch all tasks from the server
 * @returns {Promise<Array>} Array of task objects
 */
async function getTasks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

/**
 * Calculate relative time (e.g., "2 hours ago")
 * @param {string} dateString - ISO date string
 * @returns {string} Human-readable time difference
 */
function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `hace ${diff} segundos`;
    if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
    return `hace ${Math.floor(diff / 86400)} días`;
}

/**
 * Display all tasks in the task list
 */
async function showTasks() {
    const tasks = await getTasks();
    taskList.innerHTML = ""; // Clear list before displaying

    if (tasks.length === 0) {
        taskList.innerHTML = "<li style='color: #999;'>No tasks yet. Create one to get started!</li>";
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.task_title} — ${task.task_description} — ${timeAgo(task.created_at)} — ${task.task_situation ? "✔" : "✘"}`;
        taskList.appendChild(li);
    });
}

/**
 * Create a new task
 * @param {Object} input - Task data (title, description, situation)
 */
async function create(input) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
            credentials: "include" // Include accessToken if needed
        });

        const data = await res.json();
        console.log("Server response:", data);

        // Show success message and reload tasks
        alert(data.message || "Task created successfully!");
        showTasks();
    } catch (error) {
        console.error("Error creating task:", error);
        alert("Error creating task. Please try again.");
    }
}

/**
 * Delete a task by title
 * @param {string} title - Title of the task to delete
 */
async function deleteTask(title) {
    try {
        const response = await fetch(API_URL + "/" + title, {
            method: "DELETE",
            credentials: "include"
        });
        const data = await response.json();
        console.log("Delete response:", data);

        alert(data.message || "Task deleted successfully!");
        showTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
        alert("Error deleting task. Please try again.");
    }
}

/**
 * Update an existing task
 * @param {Object} input - Updated task data
 */
async function update(input) {
    try {
        const res = await fetch(`${API_URL}/${input.task_title}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
            credentials: "include"
        });
        const data = await res.json();
        console.log("Update response:", data);

        alert(data.message || "Task updated successfully!");
        showTasks();
    } catch (error) {
        console.error("Error updating task:", error);
        alert("Error updating task. Please try again.");
    }
}

// ============ EVENT LISTENERS ============

// Register form submission
registerForm.addEventListener("submit", handleRegister);

// Login form submission
loginForm.addEventListener("submit", handleLogin);

// Navigation links - Go to Login from Register
toLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginSection();
});

// Navigation links - Go to Register from Login
toRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterSection();
});

// Logout button
logoutBtn.addEventListener("click", handleLogout);

// Create task button
createBtn.addEventListener("click", () => {
    alert("You are about to create a task. Task titles must be unique.");

    const title = prompt("Create a title for your new task:");
    if (!title) return;

    const description = prompt("Create a description for your new task:");
    if (!description) return;

    const situation = prompt("Is it done? (true/false):");
    if (situation === null) return;

    const situationBool = situation.toLowerCase() === "true";

    if (!title || !description || situation === null) {
        alert("Please fill all fields correctly");
        return;
    }

    const input = {
        task_title: title,
        task_description: description,
        task_situation: situationBool
    };

    create(input);
});

// Update task button
updateBtn.addEventListener("click", () => {
    const title = prompt("Enter the title of the task you want to update:");
    if (!title) return;

    const newDescription = prompt("Enter the new description:");
    if (!newDescription) return;

    const situation = prompt("Is it done? (true/false):");
    if (situation === null) return;

    const situationBool = situation.toLowerCase() === "true";

    const input = {
        task_title: title,
        task_description: newDescription,
        task_situation: situationBool
    };

    update(input);
});

// Delete task button
deleteBtn.addEventListener("click", () => {
    const title = prompt("Enter the title of the task you want to delete:");
    if (!title) return;

    deleteTask(title);
});

// ============ INITIALIZATION ============

// Check authentication status when page loads
checkAuthStatus();