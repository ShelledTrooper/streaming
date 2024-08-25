document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    let searchIndex = [];

    // Fetch the search index JSON file
    fetch('/search_index.json')
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
        })
        .catch(error => console.error('Error loading search index:', error));

    // Handle input event to search
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length === 0) {
            searchResults.innerHTML = ''; // Clear results if query is empty
            return;
        }

        // Filter search index based on the query
        const results = searchIndex.filter(video =>
            video.title.toLowerCase().includes(query) ||
            video.tags.toLowerCase().includes(query)
        );

        // Display search results
        searchResults.innerHTML = results.map(video =>
            `<li><a href="/video/${video.id}">${video.title}</a></li>`
        ).join('');
    });
});
