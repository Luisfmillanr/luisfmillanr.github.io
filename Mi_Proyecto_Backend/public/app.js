// Mostrar mensaje de bienvenida en la consola
console.log("Bienvenido a mi página personal");

/**
 * Gestión del tema (claro/oscuro)
 */
const themeManager = (() => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (!themeToggleBtn) {
        console.error("No se pudo encontrar el botón de tema oscuro.");
        return;
    }

    // Cambia el tema entre claro y oscuro, y guarda la preferencia en localStorage
    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        notifyThemeChange(isDarkMode);
    }

    // Carga la preferencia de tema guardada en localStorage
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        const isDarkMode = savedTheme === 'dark';
        document.body.classList.toggle('dark-mode', isDarkMode);
        themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Notifica a los usuarios de lectores de pantalla sobre el cambio de tema
    function notifyThemeChange(isDarkMode) {
        const liveRegion = document.getElementById('theme-live-region');
        if (liveRegion) {
            liveRegion.textContent = isDarkMode ? 'Modo oscuro activado' : 'Modo claro activado';
        }
    }

    return {
        init: () => {
            loadThemePreference();
            themeToggleBtn.addEventListener('click', toggleTheme);
        }
    };
})();

/**
 * Gestión de precios de criptomonedas con CoinMarketCap API
 */
const cryptoPrices = (() => {
    const apiKey = '37b9f31a-0bc5-44bc-9f96-53addb9b4a44';
    const apiURL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,BNB&convert=USD`;

    // Configuración de cabeceras para la API
    const headers = {
        'X-CMC_PRO_API_KEY': apiKey,
    };

    // Obtiene los precios de criptomonedas y los muestra en la página
    async function fetchCryptoPrices() {
        try {
            const response = await fetch(apiURL, { headers });
            if (!response.ok) throw new Error(`Error al obtener los precios: ${response.statusText}`);
            const data = await response.json();
            updatePrices(data);
        } catch (error) {
            console.error('Error al obtener los precios:', error);
            displayErrorPrices();
        }
    }

    // Actualiza los precios de criptomonedas en la UI
    function updatePrices(data) {
        try {
            const btcPrice = data.data.BTC.quote.USD.price.toFixed(2);
            const ethPrice = data.data.ETH.quote.USD.price.toFixed(2);
            const bnbPrice = data.data.BNB.quote.USD.price.toFixed(2);

            document.getElementById('bitcoin-price').textContent = `$${btcPrice}`;
            document.getElementById('ethereum-price').textContent = `$${ethPrice}`;
            document.getElementById('bnb-price').textContent = `$${bnbPrice}`;
        } catch (error) {
            console.error('Error al actualizar los precios:', error);
            displayErrorPrices();
        }
    }

    // Muestra un mensaje de error si los precios no se pueden cargar
    function displayErrorPrices() {
        const errorText = 'Error al cargar';
        document.getElementById('bitcoin-price').textContent = errorText;
        document.getElementById('ethereum-price').textContent = errorText;
        document.getElementById('bnb-price').textContent = errorText;
    }

    return {
        init: () => {
            fetchCryptoPrices();
            setInterval(fetchCryptoPrices, 120000); // Actualiza los precios cada 2 minutos (120,000 ms)
        }
    };
})();

/**
 * Validación de formularios
 */
const formValidation = (() => {
    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Valida el formato del correo electrónico
    function validateEmail(email) {
        return emailRegex.test(String(email).toLowerCase());
    }

    // Muestra mensajes de error en la UI
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.textContent = message;
        document.querySelector('form').appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000); // Elimina el mensaje después de 3 segundos
    }

    // Maneja la validación del formulario y su envío
    function handleFormSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showError('Por favor, completa todos los campos.');
            return;
        }

        if (!validateEmail(email)) {
            showError('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Si todo está bien, puedes enviar el formulario o hacer alguna acción
        alert('Formulario enviado correctamente.');
        document.querySelector('form').submit();
    }

    return {
        init: () => {
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', handleFormSubmit);
            }
        }
    };
})();

/**
 * Gestión del menú móvil
 */
const mobileMenu = (() => {
    const menuToggleBtn = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    // Alterna la visibilidad del menú en dispositivos móviles
    function toggleMenu() {
        const isOpen = menuToggleBtn.getAttribute('aria-expanded') === 'true';
        menuToggleBtn.setAttribute('aria-expanded', !isOpen);
        navList.classList.toggle('open');
    }

    return {
        init: () => {
            menuToggleBtn.addEventListener('click', toggleMenu);
        }
    };
})();

/**
 * Inicialización del documento
 */
document.addEventListener("DOMContentLoaded", function() {
    themeManager.init();
    cryptoPrices.init();
    formValidation.init();
    mobileMenu.init();
});
