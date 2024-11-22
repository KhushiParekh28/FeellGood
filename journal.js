// List of inspirational quotes
const quotes = [
    "Start where you are. Use what you have. Do what you can.",
    "The best time for new beginnings is now.",
    "Happiness is not by chance, but by choice.",
    "Gratitude turns what we have into enough.",
    "Take it one day at a time."
];

// Display a random quote
document.getElementById('quote').textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

// Handle saving journal entries
const saveEntryButton = document.getElementById('save-entry');
const entriesList = document.getElementById('entries-list');
const searchInput = document.getElementById('search');

let entries = []; // Array to store journal entries

saveEntryButton.addEventListener('click', () => {
    const journalText = document.getElementById('journal-entry').value.trim();
    const tagsText = document.getElementById('tags').value.trim();
    const gratitudeText = document.getElementById('gratitude').value.trim();

    if (!journalText) {
        alert("Please write something about your day.");
        return;
    }

    const timestamp = new Date().toLocaleString();
    const entry = {
        text: journalText,
        tags: tagsText.split(',').map(tag => tag.trim()),
        gratitude: gratitudeText,
        timestamp: timestamp
    };

    entries.push(entry);
    renderEntries(entries);

    // Clear inputs
    document.getElementById('journal-entry').value = '';
    document.getElementById('tags').value = '';
    document.getElementById('gratitude').value = '';
});

// Render journal entries
function renderEntries(filteredEntries) {
    entriesList.innerHTML = '';

    filteredEntries.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>${entry.text}</p>
            <span>Tags: ${entry.tags.join(', ') || 'No tags'}</span>
            <span>Gratitude: ${entry.gratitude || 'No gratitude added'}</span>
            <span>Date: ${entry.timestamp}</span>
        `;
        entriesList.appendChild(li);
    });
}

// Filter entries based on search
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredEntries = entries.filter(entry => 
        entry.text.toLowerCase().includes(keyword) ||
        entry.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
    renderEntries(filteredEntries);
});

// Initial rendering
renderEntries(entries);

// Tag rendering
function renderTagList() {
    const uniqueTags = [...new Set(entries.flatMap(entry => entry.tags))]; // Get unique tags
    const tagContainer = document.getElementById('tag-list');
    tagContainer.innerHTML = '';
    
    uniqueTags.forEach(tag => {
        const tagElement = document.createElement('button');
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => {
            const filteredEntries = entries.filter(entry => entry.tags.includes(tag));
            renderEntries(filteredEntries);
        });
        tagContainer.appendChild(tagElement);
    });
}

// Call renderTagList() every time entries are updated
saveEntryButton.addEventListener('click', () => {
    renderEntries(entries);
    renderTagList();
});
