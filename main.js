// Product data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        category: "shirts",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 59.99,
        category: "pants",
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a"
    },
    {
        id: 3,
        name: "Summer Floral Dress",
        price: 79.99,
        category: "dresses",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"
    },
    {
        id: 4,
        name: "Leather Belt",
        price: 24.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    // Add more products as needed
];

// Cart functionality
let cart = [];
const cartCount = document.getElementById('cartCount');

function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Product rendering
const productsContainer = document.getElementById('productsContainer');

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return card;
}

function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';
    productsToRender.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchProducts(query) {
    return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    const filteredProducts = searchProducts(query);
    renderProducts(filteredProducts);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        const filteredProducts = searchProducts(query);
        renderProducts(filteredProducts);
    }
});

// Filter functionality
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const categoryCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');

function updateFilters() {
    const maxPrice = parseInt(priceRange.value);
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    let filteredProducts = products.filter(product => product.price <= maxPrice);

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }

    renderProducts(filteredProducts);
}

priceRange.addEventListener('input', (e) => {
    priceValue.textContent = `$${e.target.value}`;
    updateFilters();
});

categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilters);
});

// Add to cart functionality
productsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCartCount();
            alert('Product added to cart!');
        }
    }
});

// Initial render
renderProducts(products);