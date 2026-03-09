async function loadStore() {
    const grid = document.getElementById('product-list');
    if(!grid) return;

    const res = await fetch('/api/products');
    const products = await res.json();

    grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="window.location.href='/product.html?id=${p._id}'">
            <img src="${p.image}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">${p.price}</p>
            </div>
        </div>
    `).join('');
}

// User Handling
const user = localStorage.getItem('currentUser');
if(user && document.getElementById('auth-links')) {
    document.getElementById('auth-links').innerHTML = `<span style="color:var(--accent)">Hi, ${user}</span>`;
}

loadStore();