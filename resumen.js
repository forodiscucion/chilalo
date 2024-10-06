const cartDetails = document.getElementById('cart-details');
const userDataSection = document.getElementById('user-data');
const confirmationMessage = document.getElementById('confirmation-message');

// Recuperar productos del carrito
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalAmount = 0;

if (cart.length === 0) {
    cartDetails.textContent = 'El carrito está vacío';
} else {
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - ${item.price} (Cantidad: ${item.quantity})`;
        cartDetails.appendChild(itemDiv);
        
        // Calcular total
        const priceValue = parseFloat(item.price.replace('S/. ', ''));
        totalAmount += priceValue * item.quantity;
    });

    // Mostrar total a pagar
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total a Pagar: S/. ${totalAmount.toFixed(2)}`;
    cartDetails.appendChild(totalDiv);

    // Ingresar datos del usuario
    userDataSection.style.display = 'block';
}

// Confirmar compra
document.getElementById('confirm-purchase').addEventListener('click', () => {
    const userName = document.getElementById('user-name').value;
    const userPhone = document.getElementById('user-phone').value;

    if (userName === "" || userPhone === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    confirmationMessage.textContent = `Compra confirmada, gracias ${userName} por su compra!`;
    confirmationMessage.style.display = 'block';
    localStorage.removeItem('cart'); // Limpiar el carrito después de la compra

    // Mensaje de recogida
    confirmationMessage.innerHTML += `<br>Puede acercarse a recoger su pedido en el plazo de 3 horas, de lo contrario se devolverá el producto al stock. Recuerde pagar con efectivo.`;
    confirmationMessage.innerHTML += `<br><button id="return-to-products">Regresar a Productos</button>`;

    // Regresar a productos
    document.getElementById('return-to-products').addEventListener('click', () => {
        window.location.href = "menu.html"; // Regresar al menú
    });
});
