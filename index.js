const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar variables de entorno

const app = express();

// Middleware para parsear los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de nodemailer con variables de entorno
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Correo electrónico desde .env
        pass: process.env.EMAIL_PASS  // Contraseña desde .env (considera usar App Passwords)
    }
});

// Validar el formato del correo electrónico en el backend
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Ruta principal para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar el formulario de contacto
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validación del formulario en el backend
    if (!name || !email || !subject || !message) {
        return res.status(400).send('Por favor, completa todos los campos.');
    }

    if (!validateEmail(email)) {
        return res.status(400).send('Por favor, ingresa un correo electrónico válido.');
    }

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Dirección de correo de destino desde .env
        subject: `Nuevo mensaje de contacto: ${subject}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el mensaje:', error);
            return res.status(500).send('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
        }
        res.send('Mensaje enviado correctamente.');
    });
});

// Captura errores no manejados para evitar que el servidor se caiga
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// Captura promesas rechazadas no manejadas para evitar que el servidor se caiga
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


