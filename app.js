// Function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to save users to localStorage
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginError = document.getElementById('loginError');

    // Clear previous error
    loginError.textContent = '';

    // Fetch users from localStorage
    const users = getUsers();

    // Check if user exists and password matches
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Save user to session storage (simulating logged-in session)
        sessionStorage.setItem('user', JSON.stringify(user));
        // Redirect to the home page
        window.location.href = 'home.html';
    } else {
        loginError.textContent = "Invalid email or password.";
    }
}

// Function to register
function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const registerError = document.getElementById('registerError');

    // Clear previous error
    registerError.textContent = '';

    // Fetch existing users from localStorage
    const users = getUsers();

    // Check if email already exists
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        registerError.textContent = "Email is already registered.";
        return;
    }

    // Create new user
    const newUser = {
        name,
        email,
        password,
        mentalHealthHistory: "History of mild anxiety, occasional mood swings.",
        moodTracking: [] // Initialize with empty mood tracking
    };

    // Save the new user to localStorage
    saveUser(newUser);

    alert("Registration successful. You can now log in.");
}
