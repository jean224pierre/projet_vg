const express = require('express');
const pool = require('../db');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Public : la page d'accueil charge la galerie via cet endpoint
router.get('/', async function (req, res) {
    try {
        const result = await pool.query(
            'SELECT id, title, media_url, media_type FROM gallery_items ORDER BY display_order ASC, created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur chargement galerie:', err.message);
        res.status(500).json({ error: 'Impossible de charger la galerie.' });
    }
});

// Admin : ajouter une réalisation. Le fichier est déjà uploadé sur Cloudinary
// depuis le navigateur ; ici on reçoit juste l'URL renvoyée par Cloudinary.
router.post('/', adminAuth, async function (req, res) {
    const { title, media_url, media_type, display_order } = req.body;

    if (!media_url) {
        return res.status(400).json({ error: 'media_url est requis.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO gallery_items (title, media_url, media_type, display_order) VALUES ($1, $2, $3, $4) RETURNING *',
            [title || '', media_url, media_type || 'image', display_order || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erreur ajout galerie:', err.message);
        res.status(500).json({ error: "Impossible d'ajouter la réalisation." });
    }
});

// Admin : supprimer une réalisation
router.delete('/:id', adminAuth, async function (req, res) {
    try {
        await pool.query('DELETE FROM gallery_items WHERE id = $1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        console.error('Erreur suppression galerie:', err.message);
        res.status(500).json({ error: 'Impossible de supprimer la réalisation.' });
    }
});

module.exports = router;