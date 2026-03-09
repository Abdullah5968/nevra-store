// This tells the browser to look for the button named "glow-button"
const exploreButton = document.querySelector('.glow-button');

// This tells the button what to do when someone clicks it!
exploreButton.addEventListener('click', function() {
    alert("Welcome to the Future! The Nevra collection is loading...");
});
// 1. We find the empty box on our website
const shopContainer = document.getElementById('shop-container');

// 2. We send the waiter to the warehouse to get the clothes!
fetch('/api/products')
    .then(function(response) {
        return response.json(); // Translate the messy data
    })
    .then(function(clothes) {
        // 3. For every piece of clothing in the warehouse, build a card!
        clothes.forEach(function(item) {
            
            // This is creating the HTML skeleton automatically!
            const card = `
                <div class="product-card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                </div>
            `;
            
            // Put the finished card inside the empty box on the screen
            shopContainer.innerHTML += card;
        });
    });