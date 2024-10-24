// Fetch and display user data on the home page
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        // If no user is logged in, redirect to login page
        window.location.href = 'index.html';
        return;
    }

    // Display user info
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('mentalHealthHistory').textContent = user.mentalHealthHistory;

    // Load mood history
    loadMoodHistory();
});

// Function to handle mood selection
function handleMoodSelection() {
    const moodSelect = document.getElementById('moodSelect');
    const moodMessage = document.getElementById('moodMessage');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const suggestionsList = document.getElementById('suggestionsList');
    const reasonContainer = document.getElementById('reasonContainer');
    const ebookContainer = document.getElementById('ebookContainer');

    const selectedMood = moodSelect.value;
    suggestionsList.innerHTML = ''; // Clear previous suggestions
    suggestionsContainer.style.display = 'none'; // Hide suggestions initially
    ebookContainer.style.display = 'none'; // Hide eBooks initially
    reasonContainer.style.display = 'none'; // Hide reason input initially

    if (selectedMood === 'nice' || selectedMood === 'awesome') {
        moodMessage.textContent = "Good! You're always rocking!";
    } else if (selectedMood === 'notGood' || selectedMood === 'notFine' || selectedMood === 'worse' || selectedMood === 'depressed' || selectedMood === 'feelingLow') {
        moodMessage.textContent = "We're sorry to hear that. Please tell us why:";
        reasonContainer.style.display = 'block'; // Show reason input
    } else {
        moodMessage.textContent = ""; // Clear message for average or no selection
    }
}

// Function to submit reason and show suggestions
function submitReason() {
    const reasonInput = document.getElementById('reasonInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const ebookContainer = document.getElementById('ebookContainer');

    // Clear previous suggestions
    suggestionsList.innerHTML = ''; 
    suggestionsContainer.style.display = 'block'; // Show suggestions container
    ebookContainer.style.display = 'block'; // Show ebook recommendations

    // Suggestions
    suggestionsList.innerHTML += "<li>Practice deep breathing exercises.</li>";
    suggestionsList.innerHTML += "<li>Take a moment to meditate.</li>";
    suggestionsList.innerHTML += "<li>Write in a journal about your feelings.</li>";
    suggestionsList.innerHTML += "<li>Connect with a friend or loved one.</li>";
    suggestionsList.innerHTML += "<li>Consider reaching out to a mental health professional.</li>";
    
    // Store mood and reason in mood history
    const moodSelect = document.getElementById('moodSelect');
    const moodHistory = JSON.parse(sessionStorage.getItem('moodHistory')) || [];
    moodHistory.push({ mood: moodSelect.value, reason: reasonInput.value, date: new Date().toLocaleString() });
    sessionStorage.setItem('moodHistory', JSON.stringify(moodHistory));

    // Update mood history display
    loadMoodHistory();

    // Clear the reason input after submission
    reasonInput.value = '';
}

// Function to load and display mood history
function loadMoodHistory() {
    const moodHistoryList = document.getElementById('moodHistoryList');
    const moodHistory = JSON.parse(sessionStorage.getItem('moodHistory')) || [];

    moodHistoryList.innerHTML = ''; // Clear previous history

    moodHistory.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.date}: Mood - ${entry.mood}, Reason - ${entry.reason}`;
        moodHistoryList.appendChild(listItem);
    });
}

// Logout function
function logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('moodHistory'); // Clear mood history on logout
    window.location.href = 'index.html'; // Redirect to login page
}
