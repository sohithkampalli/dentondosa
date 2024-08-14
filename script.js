// Restaurant Data
const restaurants = [
    { id: 1, name: "Taj Mahal Restaurant", image: "images/taj-mahal.jpg" },
    { id: 2, name: "Bombay Palace", image: "images/bombay-palace.jpg" },
    // Add more restaurants here
];

// Menu Data
const menus = {
    1: [
        { id: 1, name: "Chicken Biryani", price: 10, image: "images/chicken-biryani.jpg" },
        { id: 2, name: "Paneer Butter Masala", price: 8, image: "images/paneer-butter-masala.jpg" },
        // Add more food items here
    ],
    2: [
        { id: 1, name: "Butter Chicken", price: 12, image: "images/butter-chicken.jpg" },
        { id: 2, name: "Samosa", price: 5, image: "images/samosa.jpg" },
        // Add more food items here
    ]
    // Add more menus for other restaurants here
};

const cart = [];

// Load Restaurants
if (document.getElementById('restaurant-list')) {
    const restaurantList = document.getElementById('restaurant-list');
    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <h2>${restaurant.name}</h2>
            <button onclick="viewMenu(${restaurant.id})">View Menu</button>
        `;
        restaurantList.appendChild(div);
    });
}

// Load Menu
if (document.getElementById('menu-list')) {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('restaurantId');
    const menuList = document.getElementById('menu-list');
    menus[restaurantId].forEach(food => {
        const div = document.createElement('div');
        div.className = 'food-item';
        div.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <h2>${food.name}</h2>
            <p>$${food.price}</p>
            <button onclick="addToCart(${restaurantId}, ${food.id})">Add to Cart</button>
        `;
        menuList.appendChild(div);
    });
}

// Add to Cart
function addToCart(restaurantId, foodId) {
    const food = menus[restaurantId].find(f => f.id === foodId);
    cart.push(food);
    alert(`${food.name} added to cart!`);
}

// View Cart
if (document.getElementById('cart-list')) {
    const cartList = document.getElementById('cart-list');
    let total = 0;
    cart.forEach(food => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <h2>${food.name}</h2>
            <p>$${food.price}</p>
        `;
        cartList.appendChild(div);
        total += food.price;
    });
    document.getElementById('total').textContent = total;
}

// Navigation Functions
function viewMenu(restaurantId) {
    window.location.href = `menu.html?restaurantId=${restaurantId}`;
}

function checkout() {
    window.location.href = 'cart.html';
}

function pay() {
    alert("Payment processed successfully!");
    // Clear cart and redirect to homepage
    cart.length = 0;
    window.location.href = 'index.html';
}
