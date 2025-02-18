// Retrieve products and initialize variables
const products = JSON.parse(localStorage.getItem("products")) || [];
let filteredProducts = [...products];
const productsPerPage = 8;
let currentPage = 1;
let isAscending = true;

const container = document.getElementById("product-container");
const pageDiv = document.getElementById("pagination");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalCount;
}

// Display products on the page
function displayProducts() {
    container.innerHTML = "";
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsInPage = filteredProducts.slice(start, end);

    productsInPage.forEach(product => {
        const productCard = document.createElement("a");
        productCard.href = `product.html?name=${encodeURIComponent(product.name)}&price=${product.price}&img=${encodeURIComponent(product.img)}`;
        productCard.classList.add("flex", "flex-col", "items-center", "rounded-xl", "p-6", "text-center", "m-1", "transition-transform", "duration-300", "ease-in-out", "hover:scale-105", "shadow-md", "bg-white", "justify-center");

        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="mt-1 w-full rounded-lg">
            <p class="font-bold">${product.name}</p>
            <p class="text-gray-700">${product.price}</p>
            <p class="text-sm text-gray-500">${product.category}</p>
        `;
        container.appendChild(productCard);
    });

    updatePagination();
}

// Update pagination buttons
function updatePagination() {
    pageDiv.innerHTML = "";
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.className = `rounded-lg px-4 py-2 m-2 cursor-pointer ${i === currentPage ? "bg-white text-black" : "bg-gray-500 hover:bg-gray-700 text-white"}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener("click", () => {
            currentPage = i;
            displayProducts();
        });
        pageDiv.appendChild(pageBtn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Handle pagination buttons
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
        currentPage++;
        displayProducts();
    }
});

// Filter by category
function filterByCategory(category) {
    if (category === "All") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    currentPage = 1;
    displayProducts();
}

// Filter by search term
function filterProducts() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput)
    );
    currentPage = 1;
    displayProducts();
}

// Sort products by price
function sortProductsByPrice() {
    filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return isAscending ? priceA - priceB : priceB - priceA;
    });

    isAscending = !isAscending;
    currentPage = 1;
    displayProducts();
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayProducts();
});
