const cart = []; // Arreglo para almacenar los productos añadidos
const cartIcon = document.getElementById('cart-icon');
const notification = document.getElementById('notification');
const cartSummary = document.getElementById('cart-summary');

// Función para mostrar notificaciones
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Función para añadir productos al carrito
function addToCart(product) {
    cart.push(product);
    showNotification(`${product.name} añadido al carrito!`);
}

// Manejador de eventos para el botón "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const product = {
            name: productCard.querySelector('h3').textContent,
            price: productCard.querySelector('p:nth-child(3)').textContent,
            quantity: 1 // Puedes manejar la cantidad según tus necesidades
        };
        addToCart(product);
    });
});

// Manejador de eventos para el icono del carrito
cartIcon.addEventListener('click', () => {
    cartSummary.style.display = 'block'; // Muestra el resumen del carrito
    cartSummary.innerHTML = '<h3>Resumen de Compra</h3>';
    
    if (cart.length === 0) {
        cartSummary.innerHTML += '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            cartSummary.innerHTML += `<p>${item.name} - ${item.price} (Cantidad: ${item.quantity})</p>`;
        });
        cartSummary.innerHTML += '<button id="continue-purchase">Continuar Compra</button>';
        
        document.getElementById('continue-purchase').addEventListener('click', () => {
            localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito en el local storage
            window.location.href = "resumen.html"; // Redirige al resumen de compra
        });
    }
});
