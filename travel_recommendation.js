function search() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("results");

    // Clear previous results
    resultsContainer.innerHTML = "";

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            const keyword = input;

            const isBeach = keyword === "beach" || keyword === "beaches";
            const isTemple = keyword === "temple" || keyword === "temples";
            const countryMatch = data.countries.find(country =>
                country.name.toLowerCase() === keyword
            );

  function createCard(name, imageUrl, description) {
    const card = document.createElement("div");
    card.className = "recommendation-card";

    // Add basic styling (could also be moved to CSS)
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "10px";
    card.style.margin = "15px";
    card.style.padding = "10px";
    card.style.backgroundColor = "#fff";
    card.style.width = "300px";
    card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    card.style.color = "#333";  // Make sure text isn't invisible
    card.style.fontFamily = "Arial, sans-serif";

    const title = document.createElement("h3");
    title.textContent = name;
    title.style.marginBottom = "10px";
    title.style.fontSize = "20px";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name;
    img.style.width = "100%";
    img.style.borderRadius = "8px";
    img.style.marginBottom = "10px";

    const desc = document.createElement("p");
    desc.textContent = description;
    desc.style.fontSize = "14px";
    desc.style.lineHeight = "1.5";
    desc.style.margin = "0";

    // Add all children to the card
    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(desc);

    // Add the card to the results container
    const resultsContainer = document.getElementById("results");
    resultsContainer.appendChild(card);
}



            let matched = false;

            if (isBeach && data.beaches.length >= 2) {
                data.beaches.forEach(beach => {
                    createCard(beach.name, beach.imageUrl, beach.description);
                });
                matched = true;
            } else if (isTemple && data.temples.length >= 2) {
                data.temples.forEach(temple => {
                    createCard(temple.name, temple.imageUrl, temple.description);
                });
                matched = true;
            } else if (countryMatch && countryMatch.cities.length >= 2) {
                countryMatch.cities.forEach(city => {
                    createCard(city.name, city.imageUrl, city.description);
                });
                matched = true;
            }

            if (!matched) {
                resultsContainer.innerHTML = `<p>No results found for "<strong>${input}</strong>". Try searching for "beach", "temple", or a country like "Japan" or "Australia".</p>`;
            }
        })
        .catch(error => {
            console.error("Error loading data:", error);
            resultsContainer.innerHTML = `<p>Something went wrong while loading recommendations.</p>`;
        });
}

function clearResults() {
    const searchInput = document.getElementById("searchInput");
    const results = document.getElementById("results");
    if (searchInput) searchInput.value = "";
    if (results) results.innerHTML = "";
}
