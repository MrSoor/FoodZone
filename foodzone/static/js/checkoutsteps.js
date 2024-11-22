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
                <img src="/static/img/${item.name.replace(/ /g, '').toLowerCase()}.png" alt="${item.name}" style="width: 50px; height: 50px;">
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

    // Load cart items on page load
    loadCart();

    // Navigation between steps
    let currentStep = 1;

    function showStep(step) {
        document.querySelectorAll('.form-step').forEach((formStep) => {
            formStep.classList.remove('active');
        });
        document.getElementById(`form-step${step}`).classList.add('active');

        document.querySelectorAll('.step').forEach((stepElement) => {
            stepElement.classList.remove('completed');
        });
        for (let i = 1; i <= step; i++) {
            document.getElementById(`step${i}`).classList.add('completed');
        }
    }

    document.getElementById('next-btn').addEventListener('click', function() {
        currentStep++;
        showStep(currentStep);
    });

    document.getElementById('prev-btn').addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById('confirm-btn').addEventListener('click', function() {
        alert('Order Confirmed!');
    });
});
