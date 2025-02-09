const products = JSON.parse(localStorage.getItem("products")) || [];

let isAscending = true; //to check the sortstatus
let filteredProducts = [...products]; // This will store the current filtered/sorted list
const productsPerPage = 8;
let currentPage = 1;
const container = document.getElementById("product-container");
const pageDiv = document.getElementById("pagintation");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function displayProducts() {
    container.innerHTML = ""; // Clear existing products
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    JSON.parse(localStorage.getItem("products")) || [];
    const productsinPage = filteredProducts.slice(start , end);
    productsinPage.forEach(product => {
        const productCard = document.createElement("a");
        productCard.href = `product.html?name=${encodeURIComponent(product.name)}&price=${product.price}&img=${encodeURIComponent(product.img)}`;
        productCard.classList.add("flex", "flex-col" , "items-center" , "rounded-xl" , "p-6" , "text-center" , "m-1" , "transition-transform" , "duration-300" , "ease-in-out" , "hover:scale-105" , "shadow-md" , "bg-white" , "justify-center");
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="mt-1 w-full rounded-lg">
            <p>${product.name}</p>
            <p>${product.price}</p>
        `;
        container.appendChild(productCard);
    });
    updatePagination();
}

function updatePagination() {
    pageDiv.innerHTML = "";
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.className = `rounded-lg px-4 cursor-pointer py-2 m-2 ${i === currentPage ? "bg-white text-black" : "bg-gray-500 hover:bg-gray-700 text-white"}`;
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

if (prevBtn) {
    prevBtn.addEventListener("click" , () => {
        if (currentPage > 1){
            currentPage--;
            displayProducts();
        }
    });
}
if (nextBtn) {
    nextBtn.addEventListener("click" , () => {
        if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)){
            currentPage++;
            displayProducts();
        }
    });
}

function filterProducts() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput) //searches the products that include the input
    );
    currentPage = 1;
    displayProducts(); // display filtered products using display fn
    updatePagination();
}

function sortProductsByPrice() {
    filteredProducts.sort((a, b) => { //newarray containsproducts and arrange the products in a specific order
        const priceA = parseFloat(a.price.replace('$', '')); //removes the dollar sign ($) and converts the string to a floating-point number
        const priceB = parseFloat(b.price.replace('$', ''));
        
        if (isAscending) {
            return priceA - priceB; // Ascending order
        } else {
            return priceB - priceA; // Descending order
        }
    });
    
    // Toggle sorting order for next click
    isAscending = !isAscending;
    currentPage = 1;
    displayProducts(); // Display sorted products
    updatePagination();
}

document.addEventListener("DOMContentLoaded", function () {
    displayProducts(); // Display all products when the page loads
});


