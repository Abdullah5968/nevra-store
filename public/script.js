// 1. Scroll to Shop logic
const shopNowBtn = document.querySelector('.shop-now');
if(shopNowBtn) {
    shopNowBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 800, 
            behavior: 'smooth'
        });
    });
}

// 2. Fetch and Display Products
async function loadProducts() {
    // Hamare naye HTML mein ID 'product-list' hai
    const productGrid = document.getElementById('product-list');
    
    if (!productGrid) return; // Agar page pe grid nahi hai to ruk jao

    try {
        const response = await fetch('/api/products');
        const clothes = await response.json();

        // Pehle box ko khaali karo
        productGrid.innerHTML = '';

        if (clothes.length === 0) {
            productGrid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No products found. Add some from Admin Panel!</p>";
            return;
        }

        clothes.forEach(item => {
            // Shopify style card with Click to View Details
            const card = `
                <div class="product-card" onclick="window.location.href='product.html?id=${item._id}'">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="product-info">
                        <h3>${item.name}</h3>
                        <span class="price">${item.price}</span>
                        <button class="btn-buy">View Details</button>
                    </div>
                </div>
            `;
            productGrid.innerHTML += card;
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        productGrid.innerHTML = "<p style='color:red; grid-column: 1/-1; text-align:center;'>Database connection error!</p>";
    }
}

// Page load hote hi products dikhao
loadProducts();