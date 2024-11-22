document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Function to update the total price
    function updateTotal() {
        let total = 0;
        const itemElements = cartItemsContainer.getElementsByClassName('cart-item');

        Array.from(itemElements).forEach(item => {
            const priceElement = item.querySelector('.price');
            const price = parseFloat(priceElement.getAttribute('data-price'));
            const quantity = parseInt(item.querySelector('input[type="number"]').value);
            total += price * quantity;
        });

        cartTotal.querySelector('h3').textContent = `Total: ₹${total.toFixed(2)}`;
        localStorage.setItem('cartTotal', total.toFixed(2));
    }

    // Function to add an item to the cart
    function addItemToCart(name, price) {
        const existingItem = Array.from(cartItemsContainer.getElementsByClassName('cart-item')).find(item => {
            return item.querySelector('h3').textContent === name;
        });

        if (existingItem) {
            const quantityInput = existingItem.querySelector('input[type="number"]');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        } else {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="/static/img/${name.replace(/ /g, '').toLowerCase()}.png" alt="${name}">
                <div class="item-details">
                    <h3>${name}</h3>
                    <p class="price" data-price="${price}">₹${price}</p>
                    <input type="number" value="1" min="1">
                    <button class="remove-btn">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        }

        updateTotal();
    }

    // Clear Cart functionality
    clearCartBtn.addEventListener('click', () => {
        cartItemsContainer.innerHTML = ''; // Clear all items from the cart
        updateTotal(); // Update total to ₹0.00
        localStorage.removeItem('cartItems'); // Clear saved cart from local storage
        localStorage.setItem('cartTotal', '0.00'); // Reset cart total in local storage
    });

    // Checkout functionality
    submitBtn.addEventListener('click', (event) => {
        const itemElements = cartItemsContainer.getElementsByClassName('cart-item');
        if (itemElements.length === 0) {
            event.preventDefault(); // Prevent form submission
            alert('Your cart is empty. Please add items to the cart to proceed with checkout.');
        }
    });

    // Event delegation for handling clicks on "Add to Cart" buttons
    document.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const button = event.target;
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addItemToCart(name, price);
        }
    });

    // Event delegation for handling quantity changes
    cartItemsContainer.addEventListener('input', event => {
        if (event.target.type === 'number') {
            updateTotal();
        }
    });

    // Event delegation for handling remove button clicks
    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('remove-btn')) {
            const item = event.target.closest('.cart-item');
            item.remove();
            updateTotal();
        }
    });

    // Load cart items from local storage
    function loadCart() {
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        savedCart.forEach(item => {
            addItemToCart(item.name, item.price);
            const cartItem = cartItemsContainer.lastElementChild;
            cartItem.querySelector('input[type="number"]').value = item.quantity;
        });
        updateTotal();
    }

    // Save cart items to local storage
    function saveCart() {
        const cartItems = [];
        const itemElements = cartItemsContainer.getElementsByClassName('cart-item');
        Array.from(itemElements).forEach(item => {
            const name = item.querySelector('h3').textContent;
            const price = parseFloat(item.querySelector('.price').getAttribute('data-price'));
            const quantity = parseInt(item.querySelector('input[type="number"]').value);
            cartItems.push({ name, price, quantity });
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Save cart data on page unload
    window.addEventListener('beforeunload', saveCart);

    // Initial load of cart items
    loadCart();
});