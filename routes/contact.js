const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('../db');

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

router.post('/', async function (req, res) {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        await pool.query(
            'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4)',
            [name, email, phone, message]
        );

        // L'email est envoyé sans bloquer la réponse au visiteur : si Gmail est lent
        // ou temporairement indisponible, le message reste quand même enregistré en base.
        transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.NOTIFY_EMAIL,
            replyTo: email,
            subject: 'Nouvelle demande de devis - ' + name,
            text: 'Nom: ' + name + '\nEmail: ' + email + '\nTéléphone: ' + phone + '\n\nMessage:\n' + message
        }).catch(function (err) {
            console.error('Erreur envoi email de notification:', err.message);
        });

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Erreur enregistrement message de contact:', err.message);
        res.status(500).json({ error: 'Une erreur est survenue, merci de réessayer plus tard.' });
    }
});

module.exports = router;