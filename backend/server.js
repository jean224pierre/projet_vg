const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares de base
app.use(express.json()); // Pour lire le JSON envoyé par le front-end
app.use(cors());

// Configuration du transporteur d'e-mails (ex: Gmail, OVH, SendGrid, etc.)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // ex: smtp.gmail.com
    port: process.env.SMTP_PORT, // ex: 587
    secure: false, // true pour le port 465, false pour les autres
    auth: {
        user: process.env.SMTP_USER, // Votre e-mail
        pass: process.env.SMTP_PASS  // Votre mot de passe ou mot de passe d'application
    }
});

// Route POST pour le formulaire de contact
app.post('/api/contact', [
    // 1. Validation et assainissement stricts (Protection XSS & Injections)
    body('name').trim().notEmpty().withMessage('Le nom est requis.').escape(),
    body('email').isEmail().withMessage('Email invalide.').normalizeEmail(),
    body('phone').trim().notEmpty().withMessage('Le téléphone est requis.').escape(),
    body('message').trim().notEmpty().withMessage('Le message est requis.').escape(),
    // Optionnel : Honeypot anti-spam (le champ "website" doit être vide)
    body('website').custom((value) => {
        if (value) throw new Error('Détection de spam.');
        return true;
    })
], async (req, res) => {
    
    // Vérification des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, message } = req.body;

    // Configuration de l'e-mail à envoyer
    const mailOptions = {
        from: `"${name}" <no-reply@virginadecoration.com>`,
        to: process.env.RECEIVER_EMAIL || 'contact@virginadecoration.com',
        subject: `Nouveau message de contact - ${name}`,
        text: `Vous avez reçu un nouveau message :\n\nNom : ${name}\nEmail : ${email}\nTéléphone : ${phone}\n\nMessage :\n${message}`,
        html: `
            <h3>Nouveau message depuis le site Virgina Decoration</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Message :</strong><br>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        // Envoi de l'e-mail
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Message envoyé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        return res.status(500).json({ success: false, message: 'Erreur technique lors de l\'envoi.' });
    }
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
});