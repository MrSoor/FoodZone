document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Function to load cart items from local storage
    function loadCart() {
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        savedCart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="/static/img/${item.name.replace(/ /g, '').toLowerCase()}.png" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price" data-price="${item.price}">₹${item.price.toFixed(2)}</p>
                    <input type="number" value="${item.quantity}" min="1">
                    <button class="remove-btn">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        updateTotal();
    }

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
    }

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

    // Initial load of cart items
    loadCart();
});