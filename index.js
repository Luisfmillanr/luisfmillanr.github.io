const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer'); // Importa nodemailer
const app = express();

// Middleware para parsear los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // O cualquier otro servicio de correo (Outlook, Yahoo, etc.)
    auth: {
        user: 'tu-email@gmail.com', // Tu correo electrónico
        pass: 'tu-contraseña' // Tu contraseña (considera usar un App Password o variables de entorno)
    }
});

// Ruta principal para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar el formulario de contacto
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email, // Dirección de correo del remitente
        to: 'tu-email@gmail.com', // Dirección de correo a la que deseas enviar el mensaje
        subject: `Nuevo mensaje de contacto: ${subject}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el mensaje.');
        }
        res.send('Mensaje enviado correctamente.');
    });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
