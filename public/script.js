// 1. Explore Button Logic (Banner wala button)
const exploreButton = document.querySelector('.shop-now'); // Button class change ki hai as per new HTML
if(exploreButton) {
    exploreButton.addEventListener('click', function() {
        window.scrollTo({
            top: 600,
            behavior: 'smooth'
        });
    });
}

// 2. We find the empty grid on our website
const productList = document.getElementById('product-list');

// 3. We fetch products from our MongoDB via Vercel API
fetch('/api/products')
    .then(function(response) {
        return response.json(); 
    })
    .then(function(clothes) {
        // Clear the container first
        productList.innerHTML = '';

        // 4. For every piece of clothing, build a professional card!
        clothes.forEach(function(item) {
            
            // Yahan humne click event dala hai jo product.html pe le jayega ID ke saath
            const card = `
                <div class="product-card" onclick="window.location.href='product.html?id=${item._id}'" style="cursor:pointer;">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="product-info">
                        <h3>${item.name}</h3>
                        <span class="price">${item.price}</span>
                        <button class="btn-buy">View Details</button>
                    </div>
                </div>
            `;
            
            productList.innerHTML += card;
        });
    })
    .catch(err => console.error("Error loading products:", err));