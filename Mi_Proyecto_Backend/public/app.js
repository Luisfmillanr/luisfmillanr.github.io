// Mensaje de bienvenida en la consola
console.log("Bienvenido a mi página personal");

// Función para cambiar el tema entre claro y oscuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = 'Cambiar a modo claro';
    } else {
        themeToggleBtn.textContent = 'Cambiar a modo oscuro';
    }
}

// Función para obtener los precios de criptomonedas desde la API de CoinGecko
function fetchCryptoPrices() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            document.getElementById('bitcoin-price').textContent = `$${data.bitcoin.usd}`;
            document.getElementById('ethereum-price').textContent = `$${data.ethereum.usd}`;
        })
        .catch(error => console.error('Error al obtener los precios:', error));
}

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Evento DOMContentLoaded para ejecutar el código cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Inicialización del modo oscuro/claro
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Cargar precios de criptomonedas al cargar la página
    fetchCryptoPrices();

    // Validación del formulario de contacto
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Si todo está bien, puedes enviar el formulario o hacer alguna acción
        alert('Formulario enviado correctamente.');
        form.submit();
    });

    // Actualizar los precios de criptomonedas cada 60 segundos
    setInterval(fetchCryptoPrices, 60000);
});


