const $btnSignIn = document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),
      $signUp = document.querySelector('.sign-up'),
      $signIn = document.querySelector('.sign-in'),
      $loginEmail = document.getElementById('login-email'),
      $loginPassword = document.getElementById('login-password'),
      $btnLogin = document.getElementById('btn-login'),
      $errorMessage = document.getElementById('error-message'),
      $successMessage = document.getElementById('success-message'),
      cartIcon = document.getElementById('cart-icon');

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Añadir productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p:nth-of-type(2)').textContent;

        // Añadir producto al carrito
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showConfirmationMessage(`${productName} ha sido añadido al carrito!`); // Mensaje de confirmación
    });
});

// Función para mostrar mensaje de confirmación
function showConfirmationMessage(message) {
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'notification';
    confirmationMessage.textContent = message;
    document.body.appendChild(confirmationMessage);

    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        confirmationMessage.remove();
    }, 3000);
}

// Mostrar resumen del carrito al hacer clic en el carrito
cartIcon.addEventListener('click', () => {
    window.location.href = "resumen.html"; // Redirigir al resumen de compra
});

// Validación de inicio de sesión
$btnLogin.addEventListener('click', () => {
    const email = $loginEmail.value;
    const password = $loginPassword.value;

    if (email === "user123" && password === "12345usuario") {
        $successMessage.style.display = "block"; // Muestra el mensaje de éxito
        $errorMessage.style.display = "none"; // Oculta el mensaje de error
        setTimeout(() => {
            window.location.href = "menu.html"; // Redirige a la página del menú
        }, 1000); // Espera 1 segundo antes de redirigir
    } else {
        $errorMessage.style.display = "block"; // Muestra el mensaje de error
        $successMessage.style.display = "none"; // Oculta el mensaje de éxito
    }
});
