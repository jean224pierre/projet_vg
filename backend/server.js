const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const app = express();

// Middlewares de base
app.use(express.json()); // Pour lire le JSON envoyé par le front-end
app.use(cors());

// Servir les fichiers publics
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Route d'accueil du site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Route directe pour l'administration (ex: http://localhost:3000/admin)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/index.html'));
});

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

// ============================================================
// ROUTE SÉCURISÉE DE CONNEXION ADMIN (VÉRIFICATION SERVEUR)
// Les identifiants restent strictement confidentiels dans .env
// ============================================================
let loginAttempts = {};

app.post('/api/admin/login', (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    // Protection anti-bruteforce côté serveur (5 essais / blocage 1 minute)
    if (loginAttempts[ip]) {
        if (loginAttempts[ip].lockedUntil && now < loginAttempts[ip].lockedUntil) {
            const waitSec = Math.ceil((loginAttempts[ip].lockedUntil - now) / 1000);
            return res.status(429).json({ 
                success: false, 
                message: `Trop de tentatives. Accès bloqué. Réessayez dans ${waitSec}s.` 
            });
        }
    } else {
        loginAttempts[ip] = { count: 0, lockedUntil: 0 };
    }

    const { username, password } = req.body;
    const validUser = process.env.ADMIN_USER || 'virgina_admin';
    const validPass = process.env.ADMIN_PASSWORD || 'VirginaSecure2026!';

    if (username === validUser && password === validPass) {
        loginAttempts[ip] = { count: 0, lockedUntil: 0 };
        return res.status(200).json({ 
            success: true, 
            message: 'Connexion réussie',
            token: Buffer.from(`${username}:${password}`).toString('base64')
        });
    } else {
        loginAttempts[ip].count++;
        if (loginAttempts[ip].count >= 5) {
            loginAttempts[ip].lockedUntil = now + (60 * 1000); // 1 minute de verrouillage
            return res.status(429).json({ 
                success: false, 
                message: 'Trop de tentatives erronées. Accès verrouillé pendant 60 secondes.' 
            });
        }
        return res.status(401).json({ 
            success: false, 
            message: `Identifiant ou mot de passe incorrect (${5 - loginAttempts[ip].count} essais restants)` 
        });
    }
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
});