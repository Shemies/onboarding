const products = [
    { name: "Product 1", price: "$10", img: "productsPic/1.png" },
    { name: "Product 2", price: "$15", img: "productsPic/2.png" },
    { name: "Product 3", price: "$20", img: "productsPic/3.png" },
    { name: "Product 4", price: "$25", img: "productsPic/4.png" },
    { name: "Product 5", price: "$30", img: "productsPic/5.png" },
    { name: "Product 6", price: "$35", img: "productsPic/6.png" },
    { name: "Product 11", price: "$55", img: "productsPic/1.png" },
    { name: "Product 22", price: "$42", img: "productsPic/2.png" },
    { name: "Product 33", price: "$32", img: "productsPic/3.png" },
    { name: "Product 44", price: "$28", img: "productsPic/4.png" },
    { name: "Product 55", price: "$19", img: "productsPic/5.png" },
    { name: "Product 66", price: "$4", img: "productsPic/6.png" }
];


let isAscending = true; //to check the sortstatus

function displayProducts(productsToDisplay) {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Clear existing products
    productsToDisplay.forEach(product => {
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
}

function filterProducts() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput) //searches the products that include the input
    );
    displayProducts(filteredProducts); // display filtered products using display fn
}

function sortProductsByPrice() {
    const sortedProducts = [...products].sort((a, b) => { //newarray containsproducts and arrange the products in a specific order
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
    
    displayProducts(sortedProducts); // Display sorted products
}

document.addEventListener("DOMContentLoaded", function () {
    displayProducts(products); // Display all products when the page loads
});
